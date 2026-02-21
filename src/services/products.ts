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

export async function getProductById(id: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = await customFetch<ProductProps>({
      url: "products",
      method: "GET",
      id,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
