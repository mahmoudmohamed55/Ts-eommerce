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
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
const loginSchema = z.object({
  email: z.string().min(1, { message: "Email name is required" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
});
type FormValues = z.infer<typeof loginSchema>;
const Login = () => {
  const theme = useTheme();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setFocus,
  } = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });
  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
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
            Welcome Back
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            mb={4}
          >
            Login to continue
          </Typography>

          <Box
            onSubmit={handleSubmit(onSubmit)}
            component={"form"}
            display="flex"
            flexDirection="column"
            gap={3}
          >
            <TextField
              label="Email Address"
              type="text"
              fullWidth
              {...register("email")}
              error={errors.email ? true : false}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              variant="contained"
              size="medium"
              sx={{
                my: 2,
                py: 1,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Login
            </Button>

            <Typography
              variant="body2"
              textAlign="center"
              color="text.secondary"
            >
              Don’t have an account?{" "}
              <Link
                to="/register"
                style={{ fontWeight: 500, color: theme.palette.primary.main }}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
