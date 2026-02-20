interface CustomFetchProps {
  url: "products" | "user";
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
    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Request failer (${response.status}): ${message}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.log(error);
  }
}
