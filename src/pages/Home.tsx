import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetallProducts } from "@store/products/allproducts/allproductsact";
import type { TProduct } from "../types/product.types";

import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const { records, error, loading } = useAppSelector(
    (state) => state.AllProducts
  );
  const cartItems = useAppSelector((state) => state.cart.items);
  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id],
  }));


  useEffect(() => {
    if (!records.length) {
      dispatch(actGetallProducts());
    }
  }, [dispatch, records]);

  return (
    <>
      <Heading title={"Home"} />
      <Grid>
        <Loading status={loading} error={error}>
          <Grid mb={5} container spacing={2}>
            <GridList
              records={productsFullInfo}
              renderItem={(record: TProduct) => <Product {...record} />}
              col1={4}
              col2={3}
            />
          </Grid>
        </Loading>
      </Grid>
    </>
  );
};

export default Home;
