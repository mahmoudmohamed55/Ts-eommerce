import type { TLoading } from "@types";
import LottieHandler from "../LottieHandler/LottieHandler";

type ILoading = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
  skeleton?: React.ReactNode;
};

export default function Loading({
  status,
  error,
  children,
  skeleton,
}: ILoading) {
  if (status === "pending") {
    return <>{skeleton ?? null}</>;
  }

  if (status === "failed") {
    return (
      <LottieHandler type="error" message={error || "Something went wrong"} />
    );
  }

  return <>{children}</>;
}
