import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { CookiesProvider } from "react-cookie";

const clientQuery = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider>
      <AuthContextProvider>
        <QueryClientProvider client={clientQuery}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </AuthContextProvider>
    </CookiesProvider>
  </StrictMode>,
);
