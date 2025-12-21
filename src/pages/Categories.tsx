import { GridList, Heading } from "@components/common";
import { Category } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import CategorySkeleton from "@components/feedback/skeletons/CategorySkeleton/CategorySkeleton";
import useCategories from "@hooks/useCategories";
import { Grid } from "@mui/material";

const Categories = () => {
  const { loading, error, records } = useCategories();

  return (
    <>
      <Heading title="Categories" />
      <Loading skeleton={<CategorySkeleton />} status={loading} error={error}>
        <Grid mb={5} container spacing={2}>
          <GridList
            emptyMessage=" There are no Categories"
            records={records}
            renderItem={(record) => <Category {...record} />}
            col1={4}
            col2={4}
          />
        </Grid>
      </Loading>
    </>
  );
};

export default Categories;
