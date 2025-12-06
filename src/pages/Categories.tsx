import { Category } from "@components/eCommerce";
import { Grid, Typography } from "@mui/material";
import actGetCategories from "@store/categories/act/actGetCategories";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { loading, records } = useAppSelector((state) => state.category);

  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories());
    }
  }, [dispatch, records]);
  const categoriesList =
    records.length > 0 ? (
      records.map((cat) => (
        <Grid key={cat.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <Category {...cat} />
        </Grid>
      ))
    ) : (
      <Typography variant="h6" textAlign="center">
        There are no Categories
      </Typography>
    );
  return (
    <>
      {loading === "pending" ? (
        <h1 className="text-center text-red-600 ">loading</h1>
      ) : (
        <Grid my={5} container spacing={2}>
          {categoriesList}
        </Grid>
      )}
    </>
  );
};

export default Categories;
