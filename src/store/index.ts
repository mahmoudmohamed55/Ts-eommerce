import { configureStore } from "@reduxjs/toolkit";
import category from "@store/categories/categoriesSlice";
import product from "@store/products/productsSlice";
import AllProducts from "@store/products/allproducts/AllProductsSlice";

export const store = configureStore({
  reducer: {
    category,
    product,
    AllProducts,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
