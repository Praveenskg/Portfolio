import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Invalid email-address" })
    .min(3, { message: "Email must be exactly of 3 characters." })
    .max(255, { message: "Email must not be more than 255 characters." }),
  password: z
    .string({ required_error: "Password is required." })
    .min(7, { message: "Password must  be of 6 characters." })
    .max(255, { message: "Password can't be greater than 255 characters." }),
});

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is Required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must not be more than 255" }),
  phone: z
    .string({ required_error: "Phone is Required" })
    .trim()
    .min(10, { message: "Phone must be at least 10 characters" })
    .max(20, { message: "Phone must not be more than 20 characters" }),
});

export default { signupSchema, loginSchema };
