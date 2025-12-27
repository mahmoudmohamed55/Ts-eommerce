import { actGetProductsByItems, cartCleanUp } from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetOrderStatus } from "@store/orders/ordersSlice";
import { useEffect, useMemo } from "react";
const useCart = () => {
  const dispatch = useAppDispatch();
  const { loading, error, productsFullInfo, items } = useAppSelector(
    (state) => state.cart
  );
  const placeOrderStatus = useAppSelector((state) => state.orders.loading);
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);
  const products = useMemo(() => {
    return productsFullInfo.map((el) => ({
      ...el,
      quantity: items[el.id],
    }));
  }, [productsFullInfo, items]);
  const total = products.reduce((acc, el) => acc + el.price * el.quantity, 0);

  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());

    return () => {
      promise.abort();
      dispatch(cartCleanUp());
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);
  return { loading, error, products, total, userAccessToken, placeOrderStatus };
};
export default useCart;
