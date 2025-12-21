import { Heading } from "@components/common";
import { CartSubtotalPrice } from "@components/eCommerce";
import CartItemList from "@components/eCommerce/CartItemList/CartItemList";
import { Loading } from "@components/feedback";
import CartSkeleton from "@components/feedback/skeletons/CartSkeleton/CartSkeleton";
import useCart from "@hooks/useCart";
import { Container, Stack } from "@mui/material";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";

export default function Cart() {
  const { loading, error, products, total } = useCart();

  return (
    <Container maxWidth="md">
      <Heading title="Cart" />

      <Loading
        skeleton={<CartSkeleton count={products.length} />}
        status={loading}
        error={error}
      >
        {products.length === 0 ? (
          <LottieHandler type="empty" message="Your cart is empty" />
        ) : (
          <>
            <Stack gap={2}>
              <CartItemList products={products} />
            </Stack>

            <CartSubtotalPrice total={total} />
          </>
        )}
      </Loading>
    </Container>
  );
}
