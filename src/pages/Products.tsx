import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByCatPrefix } from "@store/products/act/actGetProductsByCatPrefix";
import { productsCleanUp } from "@store/products/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Products = () => {
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

  return (
    <>
      <Heading title={`${prefix} Products`} align="left" />
      <Loading status={loading} error={error}>
        <Grid mb={5} container spacing={2}>
          <GridList
            records={productsFullInfo}
            renderItem={(record) => <Product {...record} />}
            col1={4}
            col2={3}
          />
        </Grid>
      </Loading>
    </>
  );
};

export default Products;
