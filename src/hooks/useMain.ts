import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetallProducts } from "@store/products/allproducts/allproductsact";

import { useEffect } from "react";

import { allProductsCleanUp } from "@store/products/allproducts/AllProductsSlice";
const useMain = () => {
  const dispatch = useAppDispatch();
  const { records, error, loading } = useAppSelector(
    (state) => state.AllProducts
  );
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishListItemsId = useAppSelector((state) => state.wishlist.itemsId);

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id],
    isLiked: wishListItemsId.includes(el.id),
  }));

  useEffect(() => {
    const promise = dispatch(actGetallProducts());

    return () => {
      dispatch(allProductsCleanUp());
      promise.abort();
    };
  }, [dispatch]);
  return { loading, error, productsFullInfo };
};
export default useMain;
