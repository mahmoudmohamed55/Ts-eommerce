import { Box, Typography, Stack } from "@mui/material";

type OrderProductProps = {
  title: string;
  img: string;
  price: number;
  quantity: number | undefined;
};

const OrderProduct = ({ title, img, price, quantity }: OrderProductProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src={img}
        alt={title}
        sx={{
          width: 80,
          height: 80,
          objectFit: "contain",
          borderRadius: 1,
          border: "1px solid",
          borderColor: "divider",
        }}
      />

      <Stack spacing={0.5}>
        <Typography fontWeight={600}>{title}</Typography>

        <Typography color="text.secondary">Quantity: {quantity}</Typography>
        <Typography color="text.secondary">Price : {price}</Typography>
        <Typography color="text.secondary">
          Total Price : ${price * quantity!}
        </Typography>
      </Stack>
    </Box>
  );
};

export default OrderProduct;
