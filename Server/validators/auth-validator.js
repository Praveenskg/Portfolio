import { z } from "zod";

// creating an object schema

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is Requrired" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must not be more than 255" }),
  email: z
    .string({ required_error: "Email Is required" })
    .trim()
    .email({ message: "Invalid Email Address " })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email not be more than 255 characters" }),
  phone: z
    .string({ required_error: "Phone is Requrired" })
    .trim()
    .min(10, { message: "Phone must be at least 10 characters" })
    .max(20, { message: "Phone must not be more than 20 characters" }),
  password: z
    .string({ required_error: "Password is Requrired" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(255, { message: "Password Can't be greater than 255 charaters" }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Invalid email-address" })
    .min(3, { message: "Email must be exactly of 3 characters." })
    .max(255, { message: "Email must not be more than 255 characters." }),
  password: z
    .string({ required_error: "Password is required." })
    .min(7, { message: "Password must atleast be of 6 characters." })
    .max(255, { message: "Password can't be greater than 255 characters." }),
});

export default { signupSchema, loginSchema };
