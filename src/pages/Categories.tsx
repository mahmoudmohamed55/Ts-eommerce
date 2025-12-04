import { Category } from "@components/eCommerce";
import { Grid } from "@mui/material";
import actGetCategories from "@store/categories/act/actGetCategories";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.category);
  console.log(records, loading, error);

  useEffect(() => {
    dispatch(actGetCategories());
  }, [dispatch]);
  const categoriesList =
    records.length > 0
      ? records.map((cat, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Category {...cat} />
          </Grid>
        ))
      : "There is no Categories";
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
