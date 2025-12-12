import type { TProduct } from "../../../types/product.types";
import CartItem from "../CartItem/CartItem";

type CartItemListProps = {
  products: TProduct[];
};
export default function CartItemList({ products }: CartItemListProps) {
  const renderProduct = products.map((el) => <CartItem {...el} key={el.id} />);
  return <>{renderProduct}</>;
}
