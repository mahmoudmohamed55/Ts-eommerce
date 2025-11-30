import Container from "@mui/material/Container";
import Footer from "@components/common/Footer/Footer";
import Header from "@components/common/Header/HeaderCounter/HeaderCounter";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Container maxWidth="md" className="h-dvh flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
};
export default MainLayout;
