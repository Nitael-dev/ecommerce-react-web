import type { CartOptions, CartProps } from "../interfaces/user";

export function useTempCart(
  cart: CartProps[],
  set: (name: "recomm:tempCart", value: CartProps[]) => void,
): [CartProps[], (productId: string, type: CartOptions) => void] {
  let tempCart: CartProps[] = cart || [];
  function handleCart(productId: string, type: CartOptions) {
    if (type === "clear") {
      set("recomm:tempCart", []);
    } else {
      if (!cart) {
        set("recomm:tempCart", [
          {
            id: productId,
            quantity: 1,
          },
        ]);
      } else {
        if (cart.find(({ id }) => id === productId)) {
          if (
            type === "remove" ||
            (type === "minus" &&
              cart.find(({ id }) => id === productId)?.quantity === 1)
          ) {
            tempCart = cart.filter(({ id, quantity }) => {
              if (id === productId) {
                return undefined;
              } else {
                return { id, quantity };
              }
            });
          } else {
            tempCart = cart.map(({ id, quantity }) => {
              if (id === productId) {
                return {
                  id,
                  quantity: quantity + (type === "minus" ? -1 : +1),
                };
              }
              return { id, quantity };
            });
          }
          set("recomm:tempCart", tempCart);
        } else {
          tempCart.push({ id: productId, quantity: 1 });
          set("recomm:tempCart", tempCart);
        }
      }
    }
  }

  return [tempCart, handleCart];
}
