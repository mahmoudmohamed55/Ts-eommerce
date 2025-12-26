import { Input } from "@components/Form";
import useLogin from "@hooks/useLogin";
import {
  Box,
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const {
    handleSubmit,
    register,
    formState: { errors },
    onSubmit,
    loading,
    error,
    accessToken,
    message,
  } = useLogin();
  if (accessToken) {
    return <Navigate to="/" replace={true} />;
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
            Welcome Back
          </Typography>

          {message === "account_created" && (
            <Alert sx={{ mb: 2 }} severity="success">
              Account created successfully!
            </Alert>
          )}
          {!accessToken && message === "login_required" && (
            <Alert sx={{ mb: 2 }} severity="error">
              You need to login to view this content
            </Alert>
          )}

          <Box
            onSubmit={handleSubmit(onSubmit)}
            component={"form"}
            display="flex"
            flexDirection="column"
            gap={3}
          >
            <Input
              label="Email Address"
              register={register}
              name="email"
              error={errors.email?.message}
            />

            <Input
              label="Password"
              register={register}
              name="password"
              error={errors.password?.message}
              type="password"
            />

            <Button
              type="submit"
              variant="contained"
              size="medium"
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
                "Login"
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
