import type { CartProps } from "../interfaces/user";

export function useTempCart(
  cart: CartProps[],
  set: (name: "recomm:tempCart", value: CartProps[]) => void,
): [CartProps[], (productId: string) => void] {
  let tempCart: CartProps[] = cart || [];
  function handleCart(productId: string) {
    if (!cart) {
      set("recomm:tempCart", [
        {
          id: productId,
          quantity: 1,
        },
      ]);
    } else {
      if (cart.find(({ id }) => id === productId)) {
        tempCart = cart.map(({ id, quantity }) => {
          if (id === productId) {
            return {
              id,
              quantity: quantity + 1,
            };
          }
          return { id, quantity };
        });
        set("recomm:tempCart", tempCart);
      } else {
        tempCart.push({ id: productId, quantity: 1 });
        set("recomm:tempCart", tempCart);
      }
    }
  }

  return [tempCart, handleCart];
}
