import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetCategories from "@store/categories/act/actGetCategories";
import { categoriesRecordsCleanUp } from "@store/categories/categoriesSlice";
import { useEffect } from "react";

const useCategories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(actGetCategories());

    return () => {
      dispatch(categoriesRecordsCleanUp());
    };
  }, [dispatch]);
  return { loading, error, records };
};
export default useCategories;
