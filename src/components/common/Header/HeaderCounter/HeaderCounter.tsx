import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";

const navItems = ["Home", "Categories", "About", "Contact"];
const authItems = ["Login", "Register"];
const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "left" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        {authItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "left" }}>
              <ListItemText primary={item} />
            </ListItemButton>
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
          backgroundColor: "transparent", // default شفاف
          minHeight: 48,
          pt: 0,
          pb: 0,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            backgroundColor: { xs: "transparent", sm: "#111111" }, // يظهر فقط للشاشات الكبيرة
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
                <Button
                  key={item}
                  sx={{
                    color: "#fff",
                    fontWeight: "500",
                    textTransform: "none",
                    fontSize: 14,
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>

            {/* Right Auth links */}
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
              {authItems.map((item, idx) =>
                item === "Register" ? (
                  <Button
                    key={idx}
                    variant="contained"
                    size="small"
                    sx={{ fontSize: 12, bgcolor: "primary.main" }}
                  >
                    {item}
                  </Button>
                ) : (
                  <Button key={idx} sx={{ color: "#fff", fontSize: 12 }}>
                    {item}
                  </Button>
                )
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer for Mobile */}
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
