import { actGetProductsByItems, cartCleanUp } from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect, useMemo } from "react";
const useCart = () => {
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
  return { loading, error, products, total };
};
export default useCart;
