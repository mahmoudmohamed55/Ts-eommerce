import {
  Box,
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";

import { Input } from "@components/Form";
import useRegister from "@hooks/useRegister";

const Register = () => {
  const theme = useTheme();
  const {
    handleSubmit,
    register,
    formState: { errors },
    onSubmit,
    loading,
    error,
    accessToken,
    emailAvailabilityStatus,
    onBlurHandler,
  } = useRegister();
  if (accessToken) {
    return <Navigate to={"/"} />;
  }
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
                emailAvailabilityStatus === "notAvailable" ||
                loading === "pending"
              }
              variant="contained"
              size="medium"
              type="submit"
              sx={{
                py: 1,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "16px",
                width: "50%",
                mx: "auto",
              }}
            >
              {loading === "pending" ? (
                <>
                  <CircularProgress
                    size={20}
                    sx={{
                      color: "white",
                      mr: 1,
                    }}
                  />
                  Loading...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            {error && (
              <Typography variant="body2" color="error" textAlign="center">
                {error}
              </Typography>
            )}
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
