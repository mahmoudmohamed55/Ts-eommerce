import { useEffect, useState } from "react";
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
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { totalQuantitySelector } from "@store/cart/selectors";
import styles from "./styles.module.css";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import wishlist from "@assets/svg/wishlist.svg";
import {
  Button,
  Collapse,
  Divider,
  ListItemButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { authLogout } from "@store/auth/authSlice";
import { actGetWishlist } from "@store/wishlist/wishlistSlice";
const { pumpAnimate } = styles;
const navItems = [
  { label: "Home", path: "/" },
  { label: "Categories", path: "/categories" },
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
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useAppSelector(totalQuantitySelector);
  const likeCount = useAppSelector((state) => state.wishlist.itemsId.length);
  const [isBumping, setIsBumping] = useState(false);
  const [isLikingBumping, setIsLikingBumping] = useState(false);
  useEffect(() => {
    if (accessToken) {
      dispatch(actGetWishlist("ProductIds"));
    }
  }, [dispatch, accessToken]);
  useEffect(() => {
    if (accessToken) {
      dispatch(actGetWishlist("ProductIds"));
    }
  }, [dispatch, accessToken]);
  useEffect(() => {
    if (!cartCount) {
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsBumping(true);
    const timer = setTimeout(() => {
      setIsBumping(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cartCount]);

  useEffect(() => {
    if (!likeCount) {
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLikingBumping(true);
    const timer = setTimeout(() => {
      setIsLikingBumping(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [likeCount]);
  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const open = Boolean(anchorEl);
  const handleUserClick = () => setOpenUserMenu((prev) => !prev);
  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    navigate("/");
    dispatch(authLogout());
    handleClose();
    setOpenUserMenu(false);
  };
  const drawer = (
    <Box sx={{ textAlign: "center", mt: 5 }}>
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
          label="eCom"
          sx={{
            bgcolor: "primary.main",
            color: "white",
            fontWeight: "bold",
            height: 22,
            fontSize: 18,
          }}
        />
      </Typography>

      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <NavLink
              onClick={handleDrawerToggle}
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
        {accessToken && (
          <ListItem disablePadding>
            <NavLink
              onClick={handleDrawerToggle}
              to="/orders"
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
              <ListItemText primary="Orders" />
            </NavLink>
          </ListItem>
        )}
        <ListItem disablePadding>
          <NavLink
            onClick={handleDrawerToggle}
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
            <Badge
              badgeContent={
                cartCount > 0 ? (
                  <span className={isBumping ? pumpAnimate : ""}>
                    {cartCount}
                  </span>
                ) : null
              }
              color="primary"
            >
              <ShoppingCartIcon />
            </Badge>
          </NavLink>
        </ListItem>
        <ListItem disablePadding>
          <NavLink
            to="/wishlist"
            onClick={handleDrawerToggle}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 12px",
              fontWeight: "600",

              fontSize: "14px",
            }}
          >
            Wishlist
            <Badge
              badgeContent={
                likeCount > 0 ? (
                  <span className={isLikingBumping ? pumpAnimate : ""}>
                    {likeCount}
                  </span>
                ) : null
              }
              color="error"
            >
              <Box component={"img"} src={wishlist} />
            </Badge>
          </NavLink>
        </ListItem>
        {accessToken ? (
          <>
            <ListItemButton onClick={handleUserClick}>
              <ListItemText
                primary={`Welcome: ${user?.firstName} ${user?.lastName}`}
              />
              {openUserMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openUserMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItemButton
                  component={NavLink}
                  to="/profile"
                  onClick={() => setOpenUserMenu(false)}
                >
                  <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton
                  component={NavLink}
                  to="/orders"
                  onClick={() => setOpenUserMenu(false)}
                >
                  <ListItemText primary="Orders" />
                </ListItemButton>
                <Divider />
                <ListItemButton onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </List>
            </Collapse>
          </>
        ) : (
          authItems.map((item) => (
            <ListItemButton
              onClick={handleDrawerToggle}
              key={item.label}
              component={NavLink}
              to={item.path}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#fff",
          color: "black",
          minHeight: 40,
        }}
      >
        <Container disableGutters maxWidth="lg">
          <Toolbar
            sx={{
              minHeight: 40,
              px: { xs: 1, sm: 0 },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontWeight: "600",
                fontSize: 20,
              }}
            >
              Our
              <Chip
                label="eCom"
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  fontWeight: "bold",
                  height: 22,
                  fontSize: 20,
                }}
              />
            </Typography>

            {/* Cart Icon */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },
                alignItems: "center",
                gap: 1,
              }}
            >
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
                <Badge
                  badgeContent={
                    cartCount > 0 ? (
                      <span className={isBumping ? pumpAnimate : ""}>
                        {cartCount}
                      </span>
                    ) : null
                  }
                  color="primary"
                >
                  <ShoppingCartIcon />
                </Badge>
                Cart
              </NavLink>
              <Typography>|</Typography>
              <NavLink
                to="/wishlist"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 12px",
                  fontWeight: "600",

                  fontSize: "14px",
                }}
              >
                <Badge
                  badgeContent={
                    likeCount > 0 ? (
                      <span className={isLikingBumping ? pumpAnimate : ""}>
                        {likeCount}
                      </span>
                    ) : null
                  }
                  color="error"
                >
                  <Box component={"img"} src={wishlist} />
                </Badge>
                Wishlist
              </NavLink>
            </Box>

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

      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "transparent",
          minHeight: 48,
          pt: 0,
          pb: 0,
          display: {
            xs: "none",
            sm: "flex",
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            backgroundColor: { xs: "transparent", sm: "#111111" },
            borderRadius: 1,
            px: { xs: 1, sm: 0 },
          }}
        >
          <Toolbar sx={{ minHeight: 48, px: 0 }}>
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
              {accessToken && (
                <NavLink
                  to="/profile/orders"
                  className={({ isActive }) =>
                    `block px-3 py-3 mb-2 rounded-md text-[14px] font-semibold transition
      ${isActive ? "text-white" : "text-zinc-400 hover:text-white"}`
                  }
                >
                  {"Orders"}
                </NavLink>
              )}
            </Box>

            {/* Right Auth links */}
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
              {accessToken ? (
                <>
                  <Button
                    onClick={handleClick}
                    sx={{ color: "#fff", textTransform: "none" }}
                    endIcon={<ExpandMore />}
                  >
                    {`Welcome: ${user?.firstName} ${user?.lastName}`}
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <MenuItem
                      onClick={handleClose}
                      component={NavLink}
                      to="/profile"
                    >
                      Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                authItems.map((item) => (
                  <ListItem key={item.label} disablePadding>
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
                  </ListItem>
                ))
              )}
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
