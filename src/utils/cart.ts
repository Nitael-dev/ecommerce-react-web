import type { ProductProps } from "../interfaces/products";
import type { CartOptions, UserProps } from "../interfaces/user";
import { addToCart } from "../services/cart";

interface HandleCartProps {
  product: ProductProps;
  user?: UserProps;
  fetchUser(currentUser: UserProps): void;
  setTempCart(productId: string, type: CartOptions): void;
  type: CartOptions;
}

export async function handleCart({
  product,
  user,
  fetchUser,
  setTempCart,
  type,
}: HandleCartProps) {
  if (user) {
    const updatedUser = await addToCart({
      user,
      productId: product.id,
    });
    fetchUser(updatedUser || user);
  } else {
    setTempCart(product.id, type);
  }
}

export function whereProductById(id: string[]) {
  return `{"or":[${id.map((e) => {
    return JSON.stringify({
      id: {
        eq: e,
      },
    });
  })}]}`;
}
