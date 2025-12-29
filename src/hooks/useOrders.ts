import { useAppDispatch, useAppSelector } from "@store/hooks";
import actDeleteOrder from "@store/orders/act/actDeleteOrder";
import actGetOrders from "@store/orders/act/actGetOrders";
import { resetOrderStatus } from "@store/orders/ordersSlice";
import type { TProduct } from "@types";
import { useEffect, useState } from "react";

const useOrders = () => {
  const dispatch = useAppDispatch();
  const { loading, error, orderList } = useAppSelector((state) => state.orders);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);
  console.log(selectedProduct);

  const viewDetailsHandler = (id: number) => {
    const productDetails = orderList.find((order) => order.id === id);
    setSelectedProduct(productDetails?.items ?? []);
    setShowModal(true);
  };
  const closeModalHandler = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };
  const deleteOrderHandler = (id: number) => {
    dispatch(actDeleteOrder(id));
  };
  useEffect(() => {
    const promise = dispatch(actGetOrders());
    return () => {
      promise.abort();
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);
  return {
    loading,
    error,
    orderList,
    showModal,
    selectedProduct,
    closeModalHandler,
    viewDetailsHandler,
    deleteOrderHandler,
  };
};
export default useOrders;
