import { useForm, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { loginSchema, type FormValues } from "@validations/signInSchema";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import actAuthLogin from "@store/auth/act/actAuthLogin";
import { resetUI } from "@store/auth/authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

const useLogin = () => {
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const message = searchParams.get("message");

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
  return {
    handleSubmit,
    register,
    formState: { errors },
    onSubmit,
    loading,
    error,
    accessToken,
    message,

  };
};
export default useLogin;
