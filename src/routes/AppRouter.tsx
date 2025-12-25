import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "@layouts/index";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
// Pages
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Account = lazy(() => import("@pages/Account"));
const Categories = lazy(() => import("@pages/Categories"));
const Home = lazy(() => import("@pages/Home"));
const Products = lazy(() => import("@pages/Products"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Error404 = lazy(() => import("@pages/Error"));
const Cart = lazy(() => import("@pages/Cart"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LottieHandler type="loading" message="Loading Products..." />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback="Loading Please Wait">
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "/account",
        element: (
          <Suspense fallback="Loading Please Wait">
            <Account />
          </Suspense>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <Suspense fallback={<LottieHandler type="loading" message="Loading Wishlist..." />}>
            <Wishlist />
          </Suspense>
        ),
      },
      {
        path: "categories",
        element: (
          <Suspense fallback={<LottieHandler type="loading" message="Loading Categories..." />}>
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<LottieHandler type="loading" message="Loading Cart..." />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/categories/products/:prefix",
        element: (
          <Suspense fallback={<LottieHandler type="loading" message="Loading Products..." />}>
            <Products />
          </Suspense>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<LottieHandler type="loading2" message="Loading Login..." />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback="Loading Please Wait">
            <Register />
          </Suspense>
        ),
      },
    ],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
