import { Heading } from "@components/common";
import { CartSubtotalPrice } from "@components/eCommerce";
import CartItemList from "@components/eCommerce/CartItemList/CartItemList";
import { Loading } from "@components/feedback";
import CartSkeleton from "@components/feedback/skeletons/CartSkeleton/CartSkeleton";
import useCart from "@hooks/useCart";
import { Container, Stack } from "@mui/material";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";

export default function Cart() {
  const { loading, error, products, total, userAccessToken, placeOrderStatus } =
    useCart();

  return (
    <>
      <Heading title="Cart" />
      <Container maxWidth="md">
        <Loading
          skeleton={<CartSkeleton count={products.length} />}
          status={loading}
          error={error}
        >
          {products.length ? (
            <>
              <Stack gap={2}>
                <CartItemList products={products} />
              </Stack>

              <CartSubtotalPrice
                total={total}
                userAccessToken={userAccessToken}
              />
            </>
          ) : placeOrderStatus === "succeeded" ? (
            <LottieHandler
              type="success"
              message="Your order has been placed successfully"
            />
          ) : (
            <LottieHandler type="empty" message="Your cart is empty" />
          )}
        </Loading>
      </Container>
    </>
  );
}
