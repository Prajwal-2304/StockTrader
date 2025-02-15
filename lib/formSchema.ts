import { z } from "zod"

export const formSchema = z.object({
    name: z.string().min(1, {
      message: "Name cannot be empty.",
    }),

    symbol: z.string().min(1, {
      message: "Symbol cannot be empty.",
    }),

    decimals: z.string().refine((value) => {
      const num = Number(value);
      return Number.isInteger(num) && num >= 0 && num <= 9;
    }, {
      message: "Decimals must be an integer between 0 and 9.",
    }),

    initSupply: z.string().refine((value) => {
      const num = Number(value);
      console.log(num)
      return Number.isInteger(num) && num >= 1;
    }, {
      message: "Initial supply of tokens should be at least 1.",
    }),

    description: z.string().min(10, { 
      message: "Description must be at least 10 characters long." 
    }).max(500, { 
      message: "Description cannot exceed 500 characters." 
    }),

    img: z.instanceof(File).refine((file) => file !== undefined, {
        message: "Image is required.",
    }).refine((file) => file?.size > 0 && ['image/jpeg', 'image/png', 'image/gif'].includes(file?.type), {
        message: "A valid image file (JPEG, PNG, or GIF) is required.",
    }),

    //TODO: validate them as url
    // website: z.string().optional(),
    
    // twitter: z.string().optional(),

    // telegram: z.string().optional(),

    // discord: z.string().optional(),

    revokeUpdate: z.boolean().default(false),

    revokeFreeze: z.boolean().default(false),

    revokeMint: z.boolean().default(false),
});