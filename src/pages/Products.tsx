import { GridList } from "@components/common";
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
      <Loading status={loading} error={error}>
        <Grid my={5} container spacing={2}>
          <GridList
            records={records}
            renderItem={(record) => <Product {...record} />}
          />
        </Grid>
      </Loading>
    </>
  );
};

export default Products;
