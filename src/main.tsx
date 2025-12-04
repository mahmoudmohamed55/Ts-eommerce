import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import AppRouter from "@routes/AppRouter";
import {store} from "./store";


createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
