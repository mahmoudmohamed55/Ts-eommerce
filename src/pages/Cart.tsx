import { Heading } from "@components/common";
import { CartSubtotalPrice } from "@components/eCommerce";
import CartItemList from "@components/eCommerce/CartItemList/CartItemList";
import { Loading } from "@components/feedback";
import { Container, Stack, Typography } from "@mui/material";

import { actGetProductsByItems, cartCleanUp } from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect, useMemo } from "react";

export default function Cart() {
  const dispatch = useAppDispatch();
  const { loading, error, productsFullInfo, items } = useAppSelector(
    (state) => state.cart
  );
  const products = useMemo(() => {
    return productsFullInfo.map((el) => ({
      ...el,
      quantity: items[el.id],
    }));
  }, [productsFullInfo, items]);
  const total = products.reduce((acc, el) => acc + el.price * el.quantity, 0);

  useEffect(() => {
    dispatch(actGetProductsByItems());
    return () => {
      dispatch(cartCleanUp());
    };
  }, [dispatch]);
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
