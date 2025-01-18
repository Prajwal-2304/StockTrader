import {z} from "zod"
//email,phnum,password
export const formSchemaStageOne=z.object({
    email:z.string().email({message:"Invalid email address"}),
    phoneNum:z.string().length(10,"Phone number must be 10 digits long"),
    password:z.string().min(8,"Password must be atleast 8 characters long ")
    .max(20,"Password can be atmost 20 characters")
    .refine((password)=>/[a-z]/.test(password),{message:"Password must contain atleast one lowercase letter"})
    .refine((password)=>/[0-9]/.test(password),{message:"password must contain atleast 1 number"})
    .refine((password)=>/[!@#$%^&*]/.test(password),{message:"Password must contain atleast 1 special character"}),
    confirmPassword:z.string()
}).refine((value)=>value.password===value.confirmPassword,{message:"Password and confirm password should match",path:["confirmPassword"]})
//accountnum,pan,dob
export const formSchemaStageTwo=z.object({
    accno:z.string().min(1,"Account number is required"),
    panNo:z.string().length(10,"Pan number must be of length 10")
    .refine((panNo)=>/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panNo),{message:"Pan Number must be in the format AAAAA0000A , A is alphabet and 0 is number"}),
    dateOfBirth:z.string().date("Invalid date format")
    .refine((dateOfBirth)=>{
        const dob=new Date(dateOfBirth);
        const today=new Date();
        const age=today.getFullYear()-dob.getFullYear();
        const minAge=age > 18||(age===18 && today >=new Date(dob.setFullYear(today.getFullYear())));
        return minAge;
    },{message:"Minimum age is 18 years old "})
})
//name,relation,percentage
const nomineeSchema=z.object({
    nomineeName:z.string().min(1,{message:"Nominee name is required"}),
    relation:z.string().min(1,"Relation is must"),
    percentage:z.number({required_error:"Percentage is required",invalid_type_error:"Must be a number"}).min(0,"Percentage must be atleast 0").max(100,"Percentage cannot be more than 100")
});

export const formSchemaStageThree = z.object({
    nominees: z.array(nomineeSchema)
      .min(1, "At least one nominee is required")
      .refine(
        (nominees) => {
          const total = nominees.reduce((sum, nominee) => sum + (nominee.percentage || 0), 0);
          return Math.abs(total - 100) < 0.1;
        },
        {
          message: "Total percentage must equal exactly 100%",
          path: ["nominees"]
        }
      )
  });