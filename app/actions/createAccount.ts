"use server"
import db from "@/db/index"
import { z } from "zod"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"

const createAccountSchema = z.object({
  name:z.string(),
  email: z.string().email(),
  phoneNum: z.string(),
  password: z.string(),
  
  accno: z.string(),
  panNo: z.string(),
  dateOfBirth: z.string(),
  
  nominees: z.array(z.object({
    nomineeName: z.string(),
    email:z.string().email(),
    pan:z.string(),
    relation: z.string(),
    percentage: z.number(),
  }))
})


async function sendMail({tpin,mail}:{tpin:any,mail:string}){
    const transporter = nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:process.env.MAIL_ID,
        pass:process.env.PASSWORD
      }
    });
    const mailOptions={
      from:process.env.MAIL_ID,
      to:mail,
      subject:"Account successfully created",
      text:`Please note the tpin number that is used to authorize transactions , please keep it a secret ${tpin}`,
    }
    //console.log("Mail options is ",mailOptions);
    try{
      const  res=transporter.sendMail(mailOptions)
      console.log("Sent mail");
      return res;
    }catch(err){
      console.error("Error sending mail")
    }
}

export async function createAccount(data: z.infer<typeof createAccountSchema>) {
  try {
    const validatedData = createAccountSchema.parse(data)
    console.log("received",validatedData)
    const salt = await bcrypt.genSalt(10);
    console.log("salt is ",salt);
    const hashedpass= await bcrypt.hash(validatedData.password,salt);
    const tpin=Math.floor(1000+Math.random()*9000);
   
    await db.$transaction(async (tx) => {
      try {
        const res1 = await tx.users.create({
          data: {
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phoneNum,
            password: hashedpass,
            bankacc: validatedData.accno,
            pan: validatedData.panNo,
            tpin: tpin.toString(),
            salt:salt,
            balance:0
          },
        });
        for (const nominee of validatedData.nominees) {
          const res=await tx.nominee.create({
            data: {
              email:nominee.email,
              name: nominee.nomineeName,
              pan: nominee.pan,
              percentage: nominee.percentage,
              relation:nominee.relation,
              userId: res1.id,  
            },
          });
        }
        console.log("account creation success")
      } catch (err) {
        console.error("Error in transaction: ", err);
        throw err; 
      }
    });
      try{
        const res=sendMail({tpin,mail:validatedData.email})
        return { success: true}
      }catch(err){
        console.log(err);
      }
  
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid data provided' }
    }
    return { success: false, error: 'Failed to create account' }
  }
}
