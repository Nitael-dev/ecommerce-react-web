import { createContext, useContext } from "react";
import type { RecommCookiesProps, UserProps } from "../interfaces/user";
import { useCookies } from "react-cookie";

interface AuthContextProps {
  user?: UserProps;
  fetchUser(currentUser: UserProps): void;
  logout(): void;
}

const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ "recomm:user": user }, setCookie, removeCookie] = useCookies<
    "recomm:user",
    RecommCookiesProps
  >(["recomm:user"]);

  async function fetchUser(currentUser: UserProps) {
    setCookie("recomm:user", currentUser);
  }

  async function logout() {
    removeCookie("recomm:user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        fetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
