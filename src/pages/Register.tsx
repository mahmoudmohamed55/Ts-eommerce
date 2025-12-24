import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Box,
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { signUpSchema, type FormValues } from "@validations/signUpSchema";
import { Input } from "@components/Form";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setFocus,
    getFieldState,
    trigger,
  } = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });
  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();


  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  const onBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    await trigger("email");
    const { invalid, isDirty } = getFieldState("email");

    if (isDirty && !invalid && value !== enteredEmail) {
      checkEmailAvailability(value);
    }
    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
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
            <Input
              label="First Name"
              register={register}
              name="firstName"
              error={errors.firstName?.message}
            />
            <Input
              label="Last Name"
              register={register}
              name="lastName"
              error={errors.lastName?.message}
            />
            <Input
              label="Email Address"
              type="text"
              register={register}
              name="email"
              error={errors.email?.message}
              onBlur={onBlurHandler}
              emailAvailabilityStatus={emailAvailabilityStatus}
            />

            <Input
              label="Password"
              type="password"
              register={register}
              name="password"
              error={errors.password?.message}
            />
            <Input
              label="Confirm Password"
              type="password"
              register={register}
              name="confirmPassword"
              error={errors.confirmPassword?.message}
            />

            <Button
              disabled={
                emailAvailabilityStatus === "checking" ||
                emailAvailabilityStatus === "notAvailable"
              }
              variant="contained"
              size="medium"
              type="submit"
              sx={{
                my: 2,
                py: 1,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "16px",
                width: "50%",
                mx: "auto",
              }}
            >
              Submit
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
