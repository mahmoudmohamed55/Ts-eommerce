import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishlist, wishlistCleanUp } from "@store/wishlist/wishlistSlice";
import type { TProduct } from "../types/product.types";
import { useEffect } from "react";

const Wishlist = () => {
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
    dispatch(actGetWishlist());
    return () => {
      dispatch(wishlistCleanUp());
    };
  }, [dispatch]);
  return (
    <>
      <Heading title={"Wishlist"} />
      <Loading status={loading} error={error}>
        <Grid mb={5} container spacing={2}>
          <GridList
            records={products}
            renderItem={(record: TProduct) => <Product {...record} />}
            col1={4}
            col2={3}
          />
        </Grid>
      </Loading>
    </>
  );
};
export default Wishlist;
