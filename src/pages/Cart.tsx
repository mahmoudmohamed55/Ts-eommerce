import { Heading } from "@components/common";
import { CartSubtotalPrice } from "@components/eCommerce";
import CartItemList from "@components/eCommerce/CartItemList/CartItemList";
import { Loading } from "@components/feedback";
import { Container, Stack } from "@mui/material";

import { actGetProductsByItems } from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

export default function Cart() {
  const dispatch = useAppDispatch();
  const { loading, error, productsFullInfo, items } = useAppSelector(
    (state) => state.cart
  );
  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));
  const total = products
    .map((el) => el.price)
    .reduce((acc, current) => acc + current, 0);

  useEffect(() => {
    dispatch(actGetProductsByItems());
  }, [dispatch]);
  return (
    <>
      <Container maxWidth="md">
        <Loading status={loading} error={error}>
          <Heading title="Cart" />
          <Stack gap={2}>
            <CartItemList products={products} />
          </Stack>
          <CartSubtotalPrice total={total} />
        </Loading>
      </Container>
    </>
  );
}
