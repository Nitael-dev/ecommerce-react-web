import type { ProductProps } from "../interfaces/products";
import type { UserProps } from "../interfaces/user";
import { addToCart } from "../services/cart";

interface HandleCartProps {
  product: ProductProps;
  user?: UserProps;
  fetchUser(currentUser: UserProps): void;
  setTempCart(productId: string): void;
}

export async function handleCart({
  product,
  user,
  fetchUser,
  setTempCart,
}: HandleCartProps) {
  if (user) {
    const updatedUser = await addToCart({
      user,
      productId: product.id,
    });
    fetchUser(updatedUser || user);
  } else {
    setTempCart(product.id);
  }
}
