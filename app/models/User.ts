import * as z from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long." })
    .max(20, { message: "Username must be at most 20 characters long." }),
  
  email: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long." })
    .max(25, { message: "Password must be at most 25 characters long." }),
});

// Type inference for TypeScript
export type signUpSchema = z.infer<typeof signUpSchema>;


export const loginSchema = z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters long." })
      .max(20, { message: "Username must be at most 20 characters long." }),
    
    email: z
      .string()
      .email({ message: "Please enter a valid email address." }),
    
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters long." })
      .max(25, { message: "Password must be at most 25 characters long." }),
  });
  
  // Type inference for TypeScript
  export type loginSchema = z.infer<typeof loginSchema>;
  