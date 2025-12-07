import { GridList } from "@components/common";
import { Category } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { Grid} from "@mui/material";
import actGetCategories from "@store/categories/act/actGetCategories";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.category);

  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories());
    }
  }, [dispatch, records]);

  return (
    <>
      <Loading status={loading} error={error}>
        <Grid my={5} container spacing={2}>
          <GridList
            records={records}
            renderItem={(record) => <Category {...record} />}
          />
        </Grid>
      </Loading>
    </>
  );
};

export default Categories;
