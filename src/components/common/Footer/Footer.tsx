import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  const year: number = new Date().getFullYear();

  return (
    <Box
      sx={{
        bgcolor: "#f8f9fa", // خلفية فاتحة (Standard)
        borderTop: "1px solid #e0e0e0", // خط خفيف في الأعلى
        py: 2,
        mt: "auto",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#555", // لون رمادي هادي محترف جدًا
          fontSize: "0.9rem",
        }}
      >
        <Typography component="span" sx={{ mr: 0.5 }}>
          © {year}
        </Typography>

        <Typography component="span" sx={{ fontWeight: 600 }}>
          Our Ecom
        </Typography>

        <Typography component="span" sx={{ ml: 0.5 }}>
          — All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
