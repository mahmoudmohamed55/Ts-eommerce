import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { Grid } from "@mui/material";
import type { TProduct } from "../types/product.types";
import useWishlist from "@hooks/useWishlist";

const Wishlist = () => {
  const { loading, error, products } = useWishlist();
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
