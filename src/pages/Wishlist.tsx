import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { Grid } from "@mui/material";

import useWishlist from "@hooks/useWishlist";
import type { TProduct } from "@types";
import ProductSkeleton from "@components/feedback/skeletons/ProductSkeleton/ProductSkeleton";

const Wishlist = () => {
  const { loading, error, products } = useWishlist();
  return (
    <>
      <Heading title={"Wishlist"} />
      <Loading
        skeleton={<ProductSkeleton count={products.length} />}
        status={loading}
        error={error}
      >
        <Grid mb={5} container spacing={2}>
          <GridList
            emptyMessage=" Your wishlist is empty"
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
