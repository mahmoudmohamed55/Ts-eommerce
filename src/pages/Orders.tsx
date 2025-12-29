import { Heading } from "@components/common";

import { Loading } from "@components/feedback";
import useOrders from "@hooks/useOrders";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import OrderProduct from "@components/eCommerce/Product/OrderProduct";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
const Orders = () => {
  const {
    loading,
    error,
    orderList,
    showModal,
    selectedProduct,
    viewDetailsHandler,
    closeModalHandler,
    deleteOrderHandler,
  } = useOrders();

  return (
    <>
      <Heading title="My Order" />

      <Loading status={loading} error={error}>
        {orderList.length ? (
          <TableContainer sx={{ my: 2 }} component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight={600}>Order Number</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>Items</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>Total Price</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>Actions</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orderList.map((el) => (
                  <TableRow key={el.id} hover>
                    <TableCell>#{el.id}</TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          label={`${el.items.length} items`}
                          size="small"
                          variant="outlined"
                        />

                        <Button
                          size="small"
                          variant="text"
                          startIcon={<VisibilityOutlinedIcon />}
                          onClick={() => viewDetailsHandler(el.id)}
                          sx={{ textTransform: "none" }}
                        >
                          View Details
                        </Button>
                      </Stack>
                    </TableCell>

                    <TableCell>{el.subtotal.toFixed(2)}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => deleteOrderHandler(el.id)}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <LottieHandler type="empty" message="You have no orders yet" />
        )}
      </Loading>
      <Dialog
        open={showModal}
        onClose={closeModalHandler}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Products Details
          <IconButton
            onClick={closeModalHandler}
            size="small"
            sx={{ color: "error.main" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2}>
            {selectedProduct.map((item) => (
              <OrderProduct
                key={item.id}
                title={item.title}
                img={item.img}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Orders;
