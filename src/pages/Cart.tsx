import { Heading } from "@components/common";
import { CartSubtotalPrice } from "@components/eCommerce";
import CartItemList from "@components/eCommerce/CartItemList/CartItemList";
import { Loading } from "@components/feedback";
import useCart from "@hooks/useCart";
import { Container, Stack, Typography } from "@mui/material";

export default function Cart() {
  const { loading, error, products, total } = useCart();

  return (
    <>
      <Container maxWidth="md">
        <Loading status={loading} error={error}>
          {products.length === 0 ? (
            <Typography variant="h4" sx={{ mb: 2, color: "text.secondary" }}>
              Your cart is empty 🛒
            </Typography>
          ) : (
            <>
              <Heading title="Cart" />
              <Stack gap={2}>
                <CartItemList products={products} />
              </Stack>
              <CartSubtotalPrice total={total} />
            </>
          )}
        </Loading>
      </Container>
    </>
  );
}
