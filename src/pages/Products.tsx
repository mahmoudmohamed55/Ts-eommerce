import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import useProducts from "@hooks/useProducts";
import { Grid } from "@mui/material";

const Products = () => {
  const { loading, error, productsFullInfo, prefix } = useProducts();

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
