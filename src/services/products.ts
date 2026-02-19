import type { ProductProps } from "../interfaces/products";

interface CustomFetchProps {
  url: "products";
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: BodyInit;
  id?: string;
}

export async function customFetch<T>({
  url,
  body,
  id,
  method,
}: CustomFetchProps) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}${url}${id ? "/" + id : ""}`,
      {
        body,
        method,
      },
    );
    return response.json() as T;
  } catch (error) {
    console.log(error);
  }
}

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
