import { actGetallProducts } from "@store/allproducts/act/allproductsact";
import { allProductsCleanUp } from "@store/allproducts/AllProductsSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";


import { useEffect } from "react";


const useMain = () => {
  const dispatch = useAppDispatch();
  const { records, error, loading } = useAppSelector(
    (state) => state.AllProducts
  );
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
    const promise = dispatch(actGetallProducts());

    return () => {
      dispatch(allProductsCleanUp());
      promise.abort();
    };
  }, [dispatch]);
  return { loading, error, productsFullInfo };
};
export default useMain;
