import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import AppRouter from "@routes/AppRouter";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
