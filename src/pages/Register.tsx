import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().min(1, { message: "Email name is required" }).email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters longs" })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Password should contain at least 1 special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Password and Confirm Password does not match",
    path: ["confirmPassword"],
  });
type FormValues = z.infer<typeof signUpSchema>;
const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setFocus,
  } = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  useEffect(() => {
    setFocus("firstName");
  }, [setFocus]);
  const theme = useTheme();
  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          my: 4,
          borderRadius: 3,
          boxShadow: "0 12px 35px rgb(0 0 0 / 15%)",
        }}
      >
        <CardContent sx={{ px: 4, py: 5 }}>
          <Typography variant="h4" textAlign="center" fontWeight={600} mb={1}>
            Create Account
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            mb={4}
          >
            Join us in just a few steps
          </Typography>

          <Box
            component={"form"}
            display="flex"
            flexDirection="column"
            gap={2.5}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              label="First Name"
              type="text"
              fullWidth
              {...register("firstName")}
              error={errors.firstName ? true : false}
              helperText={errors.firstName ? errors.firstName.message : ""}
            />

            <TextField
              label="Last Name"
              type="text"
              fullWidth
              {...register("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName ? errors.lastName.message : ""}
            />

            <TextField
              label="Email Address"
              type="text"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />

            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
            />

            <Button
              variant="contained"
              size="medium"
              type="submit"
              sx={{
                my: 2,
                py: 1,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Register
            </Button>

            <Typography
              variant="body2"
              textAlign="center"
              color="text.secondary"
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ fontWeight: 500, color: theme.palette.primary.main }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
