import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { memo, useEffect, useState } from "react";
import Like from "@assets/svg/like.svg";
import LikeFull from "@assets/svg/like-fill.svg";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import type { TProduct } from "@types";
import { useNavigate } from "react-router-dom";
const Product = memo(
  ({
    title,
    img,
    price,
    id,
    max,
    quantity,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    const dispatch = useAppDispatch();
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const currentMax = max - (quantity ?? 0);
    const quantityReachedToMax = currentMax <= 0 ? true : false;
    useEffect(() => {
      if (!isBtnDisabled) {
        return;
      }
      const timer = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);
      return () => {
        clearTimeout(timer);
      };
    }, [isBtnDisabled]);
    const addToCartHandler = () => {
      dispatch(addToCart(id));
      setIsBtnDisabled(true);
    };
    const addLikeHandler = () => {
      if (isAuthenticated) {
        setIsLoading(true);
        dispatch(actLikeToggle(id))
          .unwrap()
          .catch(() => {
            setIsLoading(false);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        handleClickOpen();
      }
    };
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="auth-dialog-title">Sign in required</DialogTitle>

          <DialogContent>
            <DialogContentText id="auth-dialog-description">
              You are not signed in yet.
              <br />
              Please sign in to continue and access this feature.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>

            <Button
              variant="contained"
              autoFocus
              onClick={() => {
                handleClose();
                navigate("/login");
              }}
            >
              Sign In
            </Button>
          </DialogActions>
        </Dialog>
        <Card sx={{ height: "100%", position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: "20px",
              right: "20px",
              zIndex: 125,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            onClick={!isLoading ? addLikeHandler : undefined}
          >
            {isLoading ? (
              <CircularProgress
                size={21}
                sx={{
                  color: "primary.main",
                }}
              />
            ) : (
              <Box
                component="img"
                src={isLiked ? LikeFull : Like}
                sx={{
                  "&:hover": { transform: "scale(1.1)" },
                }}
              />
            )}
          </Box>

          <CardActionArea
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={img}
              alt={title}
              sx={{
                width: 140,
                height: 140,

                margin: "16px auto 8px",
                objectFit: "contain",
              }}
            />
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ textAlign: "center", textTransform: "capitalize" }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", fontWeight: "bold", mb: 1 }}
              >
                ${price}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", fontWeight: "bold", mb: 1 }}
              >
                {quantityReachedToMax
                  ? "Max Limit Reached"
                  : `Available:${currentMax}`}
              </Typography>

              {/* زر Add to Cart */}
              <Button
                variant="contained"
                color="primary"
                disabled={isBtnDisabled || quantityReachedToMax}
                onClick={addToCartHandler}
                sx={{ mt: "auto", position: "relative" }}
              >
                {isBtnDisabled ? (
                  <>
                    <CircularProgress
                      size={20}
                      sx={{
                        color: "white",
                        mr: 1,
                      }}
                    />
                    Loading...
                  </>
                ) : (
                  "Add to Cart"
                )}
              </Button>
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    );
  }
);
export default Product;
