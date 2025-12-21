import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import ProductSkeleton from "@components/feedback/skeletons/ProductSkeleton/ProductSkeleton";
import useProducts from "@hooks/useProducts";
import { Grid } from "@mui/material";

const Products = () => {
  const { loading, error, productsFullInfo, prefix } = useProducts();

  return (
    <>
      <Heading title={`${prefix} Products`} align="left" />
      <Loading
        skeleton={<ProductSkeleton count={productsFullInfo.length} />}
        status={loading}
        error={error}
      >
        <Grid mb={5} container spacing={2}>
          <GridList
          emptyMessage=" There are no Products"
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
