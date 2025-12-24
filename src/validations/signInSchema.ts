import { z } from "zod";
const loginSchema = z.object({
  email: z.string().min(1, { message: "Email name is required" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
});

type FormValues = z.infer<typeof loginSchema>;
export { loginSchema, type FormValues };
