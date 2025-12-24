import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
type InputProps<TFieldValue extends FieldValues> = {
  label: string;
  type?: string;
  register: UseFormRegister<TFieldValue>;
  error?: string;
  name: Path<TFieldValue>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  emailAvailabilityStatus?:
    | "idle"
    | "checking"
    | "available"
    | "notAvailable"
    | "failed";
};
const Input = <TFieldValue extends FieldValues>({
  label,
  type = "text",
  register,
  error,
  name,
  onBlur,
  emailAvailabilityStatus,
}: InputProps<TFieldValue>) => {
  const { onBlur: rhfOnBlur, ...restRegister } = register(name);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
    rhfOnBlur(e);
  };
  const endAdornment = (() => {
    switch (emailAvailabilityStatus) {
      case "checking":
        return (
          <InputAdornment position="end">
            <CircularProgress size={20} />
          </InputAdornment>
        );
      case "available":
        return (
          <InputAdornment position="end">
            <CheckIcon color="success" />
          </InputAdornment>
        );
      case "notAvailable":
        return (
          <InputAdornment position="end">
            <CloseIcon color="error" />
          </InputAdornment>
        );
      default:
        return null;
    }
  })();
  return (
    <TextField
      label={label}
      type={type}
      fullWidth
      onBlur={handleBlur}
      {...restRegister}
      error={
        !!error ||
        emailAvailabilityStatus === "notAvailable" ||
        emailAvailabilityStatus === "failed"
      }
      helperText={
        error ||
        (emailAvailabilityStatus === "notAvailable"
          ? "Email is already taken"
          : "") ||
        (emailAvailabilityStatus === "failed"
          ? "Error From server. Please try again later."
          : "")
      }
      InputProps={{ endAdornment }}
    />
  );
};

export default Input;
