import { customFetch } from ".";
import type { ProductProps } from "../interfaces/products";
import { whereProductById } from "../utils/cart";

export async function getProducts() {
  try {
    const data = await customFetch<ProductProps[]>({
      url: "products",
      method: "GET",
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById<T>(id: string[] | string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = await customFetch<T>({
      method: "GET",
      url:
        typeof id === "string"
          ? "product/" + id
          : `products?_where=${whereProductById(id)}`,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
