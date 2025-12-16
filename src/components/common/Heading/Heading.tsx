import { Typography } from "@mui/material";
import { memo } from "react";

interface HeadingProps {
  title: string;
  align?: "left" | "center" | "right";
}

const Heading = memo(({ title, align = "left" }: HeadingProps) => {

  return (
    <Typography
      variant="h5"
      component="h2"
      sx={{
        fontWeight: 700,
        color: "#222",
        my: 2.5,
        textAlign: align,
        letterSpacing: "0.5px",
        textTransform: "capitalize",
      }}
    >
      {title}
    </Typography>
  );
});
export default Heading;
