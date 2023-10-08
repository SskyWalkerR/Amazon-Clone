import * as zode from "zod";

const registerSchema = zode
  .object({
    fullName: zode.string().min(1, { message: "This field is required" }),
    email: zode.string().email().min(1, { message: "Invalid email address" }),
    password: zode.string().min(1, "Password is required"),
    confirmPassword: zode.string().min(1, "Confirm Password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterType = zode.infer<typeof registerSchema>;

const signinSchema = zode.object({
  email: zode.string().email().min(1, { message: "Invalid email address" }),
  password: zode.string().min(1, "Password is required"),
});

export type SigninType = zode.infer<typeof signinSchema>;

class FormValidator {
  static registerSchema = registerSchema;
  static signinSchema = signinSchema;
}

export default FormValidator;
