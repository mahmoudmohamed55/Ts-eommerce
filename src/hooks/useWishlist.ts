import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishlist, wishlistCleanUp } from "@store/wishlist/wishlistSlice";

import { useEffect } from "react";
const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { loading, error, productsFullInfo, itemsId } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItems = useAppSelector((state) => state.cart.items);


  const products = productsFullInfo.map((el) => ({
    ...el,
    isLiked: itemsId.includes(el.id),
    quantity: cartItems[el.id],
  }));
  useEffect(() => {
    const promise = dispatch(actGetWishlist());
    return () => {
      dispatch(wishlistCleanUp());
      promise.abort();
    };
  }, [dispatch]);
  return { loading, error, products };
};
export default useWishlist;
