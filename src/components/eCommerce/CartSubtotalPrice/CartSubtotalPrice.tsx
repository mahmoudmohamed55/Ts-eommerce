import { Stack, Typography } from "@mui/material";

export default function CartSubtotalPrice({ total }: { total: number }) {
  return (
    <Stack my={2} direction={"row"} justifyContent={"space-between"}>
      <Typography component={"p"}>SubTotal:</Typography>
      <Typography fontSize={"18px"} fontWeight={"bold"} color="primary" component={"p"}>{total}$</Typography>
    </Stack>
  );
}
