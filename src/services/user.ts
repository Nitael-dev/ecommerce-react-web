import { customFetch } from ".";
import type { UserDTO, UserProps } from "../interfaces/user";

export async function createUser(body: UserDTO) {
  try {
    const data = await customFetch<UserProps>({
      url: "user",
      method: "POST",
      body: JSON.stringify({ ...body, cart: body.cart || [] }),
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers() {
  try {
    const users = await customFetch<UserProps[]>({
      url: "user",
      method: "GET",
    });
    return users;
  } catch (error) {
    console.log(error);
  }
}
