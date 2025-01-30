"use server"
import db from "@/db/index"
import { z } from "zod"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import { Prisma } from "@prisma/client"

const createAccountSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNum: z.string(),
  password: z.string(),

  accno: z.string(),
  panNo: z.string(),
  dateOfBirth: z.string(),

  nominees: z.array(
    z.object({
      nomineeName: z.string(),
      email: z.string().email(),
      pan: z.string(),
      relation: z.string(),
      percentage: z.number(),
    }),
  ),
})

async function sendMail({ tpin, mail }: { tpin: any; mail: string }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.PASSWORD,
    },
  })
  const mailOptions = {
    from: process.env.MAIL_ID,
    to: mail,
    subject: "Account successfully created",
    text: `Please note the tpin number that is used to authorize transactions, please keep it a secret ${tpin}`,
  }
  try {
    const res = await transporter.sendMail(mailOptions)
   // console.log("Sent mail")
    return res
  } catch (err) {
    console.error("Error sending mail", err)
  }
}

export async function createAccount(data: z.infer<typeof createAccountSchema>) {
  try {
    const validatedData = createAccountSchema.parse(data)
    

    const existingUser = await db.users.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { pan: validatedData.panNo },
          { bankacc: validatedData.accno }
        ]
      }
    })

    if (existingUser) {

      if (existingUser.email === validatedData.email) {
        return { success: false, error: 'A user with this email already exists.' }
      }
      if (existingUser.pan === validatedData.panNo) {
        return { success: false, error: 'A user with this PAN number already exists.' }
      }
      if (existingUser.bankacc === validatedData.accno) {
        return { success: false, error: 'A user with this bank account number already exists.' }
      }
      return { success: false, error: 'User with provided details already exists.' }
    }


    const salt = await bcrypt.genSalt(10)
    const hashedpass = await bcrypt.hash(validatedData.password, salt)
    const tpin = Math.floor(1000 + Math.random() * 9000)

    const transactionResult = await db.$transaction(async (tx) => {
  
      const newUser = await tx.users.create({
        data: {
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phoneNum,
          password: hashedpass,
          bankacc: validatedData.accno,
          pan: validatedData.panNo,
          tpin: tpin.toString(),
          salt: salt,
          balance: 0,
        },
      })


      await tx.portfolio.create({
        data: {
          userid: newUser.id,
        },
      })

    
      await Promise.all(
        validatedData.nominees.map((nominee) =>
          tx.nominee.create({
            data: {
              email: nominee.email,
              name: nominee.nomineeName,
              pan: nominee.pan,
              percentage: nominee.percentage,
              relation: nominee.relation,
              userId: newUser.id,
            },
          })
        )
      )

      return newUser
    })

    // If transaction successful, try to send email
    if (transactionResult) {
      try {
        await sendMail({ tpin, mail: validatedData.email })
        return { 
          success: true, 
          message: "Account created successfully",
          userId: transactionResult.id 
        }
      } catch (error) {
        console.error("Failed to send email:", error)
        return { 
          success: true, 
          message: "Account created successfully, but failed to send email",
          userId: transactionResult.id 
        }
      }
    }

    throw new Error("Failed to create account")

  } catch (error) {
    console.error("Account creation error:", error)
    
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: "Invalid data provided",
        details: error.errors 
      }
    }
    
    if (error instanceof Error) {
      return { 
        success: false, 
        error: error.message 
      }
    }
    
    return { 
      success: false, 
      error: "Failed to create account" 
    }
  }
}