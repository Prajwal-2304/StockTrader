import { z } from "zod"

export const formSchemaStageOne = z.object({
  name: z.string().min(1, "Name is a required field"),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNum: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const formSchemaStageTwo = z.object({
  accno: z.string().min(1, { message: "Account number is required" }),
  panNo: z.string().length(10, { message: "PAN number must be 10 characters long" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
});

const nomineeSchema = z.object({
  nomineeName: z.string().min(1, { message: "Nominee name is required" }),
  email: z.string().email({ message: "Email of nominee is required" }),
  pan: z.string().length(10, "PAN number should be of length 10").refine(
    (value) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value),
    { message: "PAN Number must be in the format AAAAA0000A, A is alphabet and 0 is number" }
  ),
  relation: z.string().min(1, "Relation is required"),
  percentage: z.number({ required_error: "Percentage is required", invalid_type_error: "Must be a number" })
    .min(0, "Percentage must be at least 0")
    .max(100, "Percentage cannot be more than 100")
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