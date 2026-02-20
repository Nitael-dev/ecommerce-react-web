import { customFetch } from ".";
import type { ProductProps } from "../interfaces/products";

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
