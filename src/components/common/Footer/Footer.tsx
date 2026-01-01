import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  const year: number = new Date().getFullYear();

  return (
    <Box
      sx={{
        bgcolor: "#f8f9fa", 
        borderTop: "1px solid #e0e0e0", 
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
          color: "#555", 
          fontSize: "0.9rem",
        }}
      >
        <Typography component="span" sx={{ mr: 0.5 }}>
          © {year}
        </Typography>

        <Typography color="primary" variant="h5" component="span" sx={{ fontWeight: 600 }}>
          Our-eCom
        </Typography>

        <Typography component="span" sx={{ ml: 0.5 }}>
          — All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
