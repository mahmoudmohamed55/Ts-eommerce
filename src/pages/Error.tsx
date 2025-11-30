import { Button } from "@mui/material";
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function Error404() {
  const error = useRouteError();
  let errorStatus: number;
  let ErrorStatusText: string;
  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    ErrorStatusText = error.statusText;
  } else {
    errorStatus = 404;
    ErrorStatusText = "   Oops! Page not found.";
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f7f7f7] text-center px-4">
      <h1 className="text-[120px] font-extrabold text-gray-800 leading-none">
        {errorStatus}
      </h1>

      <p className="text-xl text-gray-600 mt-2">{ErrorStatusText}</p>

      <p className="text-md text-gray-500 mt-1 mb-8 max-w-md">
        The page you’re looking for doesn’t exist or may have been moved — but
        don’t worry! You can go back to safety.
      </p>
      <Link to={"/"} replace={true}>
        <Button
          variant="contained"
          color="primary"
          sx={{ px: 4, py: 1.2, fontWeight: "600", borderRadius: "8px" }}
        >
          Back to Homepage
        </Button>
      </Link>
    </div>
  );
}
