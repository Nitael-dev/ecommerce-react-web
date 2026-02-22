import { createContext, useContext } from "react";
import type {
  CartOptions,
  CartProps,
  RecommCookiesProps,
  UserProps,
} from "../interfaces/user";
import { useCookies } from "react-cookie";
import { useTempCart } from "../hook/tempCart";

interface AuthContextProps {
  user?: UserProps;
  fetchUser(currentUser: UserProps): void;
  logout(): void;
  tempCart: CartProps[];
  setTempCart(productId: string, type: CartOptions): void;
}

const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    { "recomm:user": user, "recomm:tempCart": tempCart },
    setCookie,
    removeCookie,
  ] = useCookies<"recomm:user" | "recomm:tempCart", RecommCookiesProps>([
    "recomm:user",
    "recomm:tempCart",
  ]);

  const [cart, setCart] = useTempCart(tempCart || [], setCookie);

  async function fetchUser(currentUser: UserProps) {
    setCookie("recomm:user", currentUser);
  }

  async function logout() {
    removeCookie("recomm:user");
    removeCookie("recomm:tempCart");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        fetchUser,
        logout,
        tempCart: cart,
        setTempCart: setCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
