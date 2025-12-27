import { combineReducers, configureStore } from "@reduxjs/toolkit";
import category from "@store/categories/categoriesSlice";
import product from "@store/products/productsSlice";
import AllProducts from "@store/products/allproducts/AllProductsSlice";
import cart from "@store/cart/cartSlice";
import wishlist from "@store/wishlist/wishlistSlice";
import auth from "@store/auth/authSlice";
import orders from "@store/orders/ordersSlice";
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
  whitelist: ["cart", "auth"],
};
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken"],
};
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};
const rootReducers = combineReducers({
  category,
  product,
  AllProducts,
  cart: persistReducer(cartPersistConfig, cart),
  wishlist,
  auth: persistReducer(authPersistConfig, auth),
  orders,
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
