interface CustomFetchProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: BodyInit;
  id?: string | string[];
}

export async function customFetch<T>({ url, body, method }: CustomFetchProps) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
      body,
      method,
    });
    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Request failed (${response.status}): ${message}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.log(error);
  }
}
