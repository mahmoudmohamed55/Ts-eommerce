import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Categories", path: "/categories" },
  { label: "About", path: "/about" },
  { label: "Account", path: "/account" },
];

const authItems = [
  { label: "Login", path: "/login" },
  { label: "Register", path: "/register" },
];
const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = 4; // لاحقًا هتكون State ديناميكية
  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", mt: 5 }}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          color: "black",
          fontWeight: "600",
          mb: 2,
        }}
      >
        Our
        <Chip
          label="E-com"
          sx={{ bgcolor: "primary.main", color: "white", fontWeight: "bold" }}
        />
      </Typography>

      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <NavLink
              to={item.path}
              style={({ isActive }) => ({
                display: "block",
                width: "100%",
                fontWeight: "600",
                textTransform: "none",
                padding: "14px 12px",
                fontSize: "15px",
                borderRadius: "6px",
                marginBottom: "6px",

                color: isActive ? "#fff" : "#222",

                backgroundColor: isActive ? "rgba(0,0,0,0.35)" : "transparent",

                transition: "0.25s ease",
              })}
            >
              <ListItemText primary={item.label} />
            </NavLink>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <NavLink
            to="/cart"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 12px",
              fontWeight: "600",

              fontSize: "14px",
            }}
          >
            Cart
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </NavLink>
        </ListItem>
        {authItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <NavLink
              to={item.path}
              style={({ isActive }) => ({
                display: "block",
                width: "100%",
                fontWeight: "600",
                textTransform: "none",
                padding: "14px 12px",
                fontSize: "15px",
                borderRadius: "6px",
                marginBottom: "6px",

                color: isActive ? "#fff" : "#222",

                backgroundColor: isActive ? "rgba(0,0,0,0.35)" : "transparent",

                transition: "0.25s ease",
              })}
            >
              <ListItemText primary={item.label} />
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* Top AppBar - Site Name */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#fff",
          color: "black",
          minHeight: 40,
        }}
      >
        <Container maxWidth="md">
          <Toolbar
            sx={{
              minHeight: 40,
              px: { xs: 1, sm: 0 },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Left: Site Name */}
            <Typography
              variant="h6"
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Our
              <Chip
                label="E-com"
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  fontWeight: "bold",
                  height: 22,
                  fontSize: 12,
                }}
              />
            </Typography>

            {/* Cart Icon */}
            <IconButton
              sx={{ color: "black", display: { xs: "none", sm: "flex" } }}
            >
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Right: Menu Icon for Mobile */}
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" }, color: "black" }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Navigation Bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "transparent",
          minHeight: 48,
          pt: 0,
          pb: 0,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            backgroundColor: { xs: "transparent", sm: "#111111" },
            borderRadius: 1,
            px: { xs: 1, sm: 0 },
          }}
        >
          <Toolbar sx={{ minHeight: 48, px: 0 }}>
            {/* Left Navigation links */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                gap: 2,
                flexGrow: 1,
              }}
            >
              {navItems.map((item) => (
                <NavLink
                  to={item.path}
                  key={item.label}
                  className={({ isActive }) =>
                    `block px-3 py-3 mb-2 rounded-md text-[14px] font-semibold transition
      ${isActive ? "text-white" : "text-zinc-400 hover:text-white"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </Box>

            {/* Right Auth links */}
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
              {authItems.map((item, idx) => (
                <NavLink
                  to={item.path}
                  key={idx}
                  className={({ isActive }) =>
                    `block px-3 py-3 mb-2 rounded-md text-[14px] font-semibold transition
      ${isActive ? "text-white" : "text-zinc-400 hover:text-white"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        anchor="left"
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
