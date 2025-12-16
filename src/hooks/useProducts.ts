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

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id],
    isLiked: wishListItemsId.includes(el.id),
  }));

  useEffect(() => {
    if (prefix) {
      dispatch(actGetProductsByCatPrefix(prefix));
    }
    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, prefix]);
    return { loading, error, productsFullInfo, prefix };
};
export default useProducts;