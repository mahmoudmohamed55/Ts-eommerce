import { GridList } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetallProducts } from "@store/products/allproducts/allproductsact";
import { useEffect } from "react";


const Home = () => {
  const dispatch = useAppDispatch();
  const { records, error, loading } = useAppSelector(
    (state) => state.AllProducts
  );
  console.log(records);

  useEffect(() => {
    dispatch(actGetallProducts());
  }, [dispatch]);

  return (
    <Grid>
      <Loading status={loading} error={error}>
        <Grid my={5} container spacing={2}>
          <GridList
            records={records}
            renderItem={(record) => <Product {...record} />}
            col1={4}
            col2={3}
          />
        </Grid>
      </Loading>
    </Grid>
  );
};

export default Home;
