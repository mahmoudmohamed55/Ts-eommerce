import Lottie from "lottie-react";
import { Box, Typography } from "@mui/material";

import error from "@assets/lottieFiles/Tomato Error.json";
import empty from "@assets/lottieFiles/Empty Shopping.json";
import notFound from "@assets/lottieFiles/Lonely 404.json";
import loading from "@assets/lottieFiles/Shopping bag.json";
import loading2 from "@assets/lottieFiles/loading.json"
import success from "@assets/lottieFiles/success.json";
const lottieFilesMap = {
  notFound,
  empty,
  loading,
  loading2,
  error,
  success,
};

type LottieHandlerProps = {
  type: keyof typeof lottieFilesMap;
  message?: string | React.ReactNode;
  width?: number | string;
  height?: number | string;
};

const DEFAULT_SIZE = 300;

const LottieHandler = ({
  type,
  message,
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
}: LottieHandlerProps) => {
  const lottie = lottieFilesMap[type];

  return (
    <Box
      width="100%"
      minHeight={400}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box sx={{ width, height }}>
        <Lottie animationData={lottie} loop />
      </Box>

      {message && (
        <Typography
          variant="body1"
         
          textAlign="center"
          mt={2}
          maxWidth={400}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LottieHandler;
