import type { TLoading } from "@types";

;

type ILoading = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
};
export default function Loading({ status, error, children }: ILoading) {
  if (status === "pending") {
    return <h1 className="text-center text-red-600 ">loading</h1>;
  }
  if (status === "failed") {
    return <h1 className="text-center text-red-600 ">{error}</h1>;
  }
  return children;
}
