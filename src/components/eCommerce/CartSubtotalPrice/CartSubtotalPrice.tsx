import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { clearCartAfterPlaceOrder } from "@store/cart/cartSlice";
import { useAppDispatch } from "@store/hooks";
import actPlaceOrder from "@store/orders/act/actPlaceOrder";
import { useState } from "react";

export default function CartSubtotalPrice({
  total,
  userAccessToken,
}: {
  total: number;
  userAccessToken: string | null;
}) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const placeOrderHandler = () => {
    setLoading(true);
    dispatch(actPlaceOrder(total))
      .unwrap()
      .then(() => {
        dispatch(clearCartAfterPlaceOrder());
        setOpenConfirm(false);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Stack my={2} direction={"column"} justifyContent={"space-between"}>
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Typography fontWeight={"bold"} component={"p"}>
            SubTotal:
          </Typography>
          <Typography
            fontSize={"18px"}
            fontWeight={"bold"}
            color="primary"
            component={"p"}
          >
            {total}$
          </Typography>
        </Box>
        {userAccessToken && (
          <Button
            onClick={() => setOpenConfirm(true)}
            sx={{
              width: "25%",
              mt: 2,
              ml: "auto",
              fontWeight: "bold",
              bgcolor: "info.light",
            }}
            variant="contained"
          >
            Place Order
          </Button>
        )}
      </Stack>
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Checkout</DialogTitle>

        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to proceed with your order?
            <br />
            You can review your cart items before completing the checkout.
          </DialogContentText>
          {!loading && error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="inherit">
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{ backgroundColor: "info.light" }}
            onClick={placeOrderHandler}
            autoFocus
          >
            {loading ? (
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
              "Confirm"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
