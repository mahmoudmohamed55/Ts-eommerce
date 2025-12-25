import {
  Box,
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  useTheme,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { loginSchema, type FormValues } from "@validations/signInSchema";
import { Input } from "@components/Form";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actAuthLogin from "@store/auth/act/actAuthLogin";
import { resetUI } from "@store/auth/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const message = searchParams.get("message");
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
    if (searchParams.has("message")) {
      setSearchParams("");
    }
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };
  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);
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
