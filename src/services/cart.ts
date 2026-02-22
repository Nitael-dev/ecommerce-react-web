import { customFetch } from ".";
import type { UserProps } from "../interfaces/user";

interface AddToCartProps {
  user: UserProps;
  productId: string;
}

export async function addToCart({ user, productId }: AddToCartProps) {
  try {
    if (user.cart.find(({ id }) => id === productId)) {
      const newUser = {
        ...user,
        cart: user.cart.map(({ id, quantity }) => {
          if (id === productId) {
            return {
              id,
              quantity: quantity + 1,
            };
          } else {
            return { id, quantity };
          }
        }),
      };

      const response = await customFetch<UserProps>({
        url: `user/${newUser.id}`,
        method: "PUT",
        body: JSON.stringify(newUser),
      });
      return response;
    } else {
      const response = await customFetch<UserProps>({
        url: `user/${user.id}`,
        method: "PUT",
        body: JSON.stringify({
          ...user,
          cart: [
            ...user.cart,
            {
              id: productId,
              quantity: 1,
            },
          ],
        }),
        id: user.id,
      });
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}
