import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { Grid } from "@mui/material";
import type { TProduct } from "../types/product.types";
import useMain from "@hooks/useMain";


const Home = () => {
  const { loading, error, productsFullInfo } = useMain();

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
