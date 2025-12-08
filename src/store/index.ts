import { combineReducers, configureStore } from "@reduxjs/toolkit";
import category from "@store/categories/categoriesSlice";
import product from "@store/products/productsSlice";
import AllProducts from "@store/products/allproducts/AllProductsSlice";
import cart from "@store/cart/cartSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const rootPersistConfig = {
  key: "root",
  storage,
  whiteList: "cart",
};
const rootReducers = combineReducers({
  category,
  product,
  AllProducts,
  cart,
});
const persistedReducer = persistReducer(rootPersistConfig, rootReducers);
const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);
export { store, persistor };
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
