import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByCatPrefix } from "@store/products/act/actGetProductsByCatPrefix";
import { productsCleanUp } from "@store/products/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const useProducts = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.product);
  const { prefix } = useParams<{ prefix: string }>();
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishListItemsId = useAppSelector((state) => state.wishlist.itemsId);
  const { accessToken } = useAppSelector((state) => state.auth);
  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id],
    isLiked: wishListItemsId.includes(el.id),
    isAuthenticated: accessToken ? true : false,
  }));

  useEffect(() => {
    const promise = dispatch(actGetProductsByCatPrefix(prefix as string));
    return () => {
      dispatch(productsCleanUp());
      promise.abort();
    };
  }, [dispatch, prefix]);
  return { loading, error, productsFullInfo, prefix };
};
export default useProducts;
