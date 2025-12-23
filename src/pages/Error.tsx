import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <Box
      width="500px"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.default"
      mx={"auto"}
    >
      <LottieHandler
        type="notFound"
        width={"100%"}
        message={
          <Link to="/" replace>
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                mt: 2,
              }}
            >
              
              Back to Homepage
            </Button>
          </Link>
        }
      />
    </Box>
  );
}
