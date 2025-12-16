import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishlist, wishlistCleanUp } from "@store/wishlist/wishlistSlice";

import { useEffect } from "react";
const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { loading, error, productsFullInfo, itemsId } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItems = useAppSelector((state) => state.cart.items);
console.log(productsFullInfo);

  const products = productsFullInfo.map((el) => ({
    ...el,
    isLiked: itemsId.includes(el.id),
    quantity: cartItems[el.id],
  }));
  useEffect(() => {
    dispatch(actGetWishlist());
    return () => {
      dispatch(wishlistCleanUp());
    };
  }, [dispatch]);
  return { loading, error, products };
};
export default useWishlist;
