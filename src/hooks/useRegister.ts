import { useEffect } from "react";
import { signUpSchema, type FormValues } from "@validations/signUpSchema";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actAuthRegister from "@store/auth/act/actAuthRegister";
import { resetUI } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
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
    const { firstName, lastName, email, password } = data;


    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login?message=account_created");
      });
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
    emailAvailabilityStatus,
    onBlurHandler,
  };
};
export default useRegister;
