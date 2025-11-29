import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Footer() {
  const year: number = new Date().getFullYear();
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: "1px solid #b5b5b5",
        py: 2,
      }}
    >
      &copy;{year}<Typography variant="h5" mx={.5} color="primary" component={"span"}> Our Ecom</Typography>, All rights reserved.
    </Container>
  );
}
