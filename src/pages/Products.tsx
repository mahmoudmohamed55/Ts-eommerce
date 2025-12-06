import { Product } from "@components/eCommerce";
import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByCatPrefix } from "@store/products/act/actGetProductsByCatPrefix";
import { productsCleanUp } from "@store/products/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Products = () => {
  const dispatch = useAppDispatch();
  const { loading, records } = useAppSelector((state) => state.product);
  const { prefix } = useParams<{ prefix: string }>();

  useEffect(() => {
    if (prefix) {
      dispatch(actGetProductsByCatPrefix(prefix));
    }
    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, prefix]);
  const productsList =
    records.length > 0 ? (
      records.map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Product {...product} />
        </Grid>
      ))
    ) : (
      <Typography variant="h6" textAlign="center">
        There are no products
      </Typography>
    );
  return (
    <>
      {loading === "pending" ? (
        <h1 className="text-center text-red-600 ">loading</h1>
      ) : (
        <Grid my={5} container spacing={2}>
          {productsList}
        </Grid>
      )}
    </>
  );
};

export default Products;
