import { GridList, Heading } from "@components/common";
import { Category } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import useCategories from "@hooks/useCategories";
import { Grid } from "@mui/material";

const Categories = () => {
  const { loading, error, records } = useCategories();

  return (
    <>
      <Heading title="Categories" />
      <Loading status={loading} error={error}>
        <Grid mb={5} container spacing={2}>
          <GridList
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
