import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f7f7f7] text-center px-4">
      <LottieHandler
        type="notFound"
        width={"100%"}
        height={"100%"}
        message={
          <Link to={"/"} replace={true}>
            <Button
              variant="contained"
              color="primary"
              sx={{ px: 4, py: 1.2, fontWeight: "600", borderRadius: "8px" }}
            >
              Back to Homepage
            </Button>
          </Link>
        }
      />
    </div>
  );
}
