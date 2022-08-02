import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect } from "react";

interface Auth {
  setToken: (token: string) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext({} as Auth);

export const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/dashboard");
    }
  }, []);
  const logout = async () => {
    Cookies.remove("token");
    await router.push("/");
  };
  const setToken = async (token: string) => {
    Cookies.set("token", token);
  };
  return (
    <AuthContext.Provider
      value={{
        setToken,
        isAuthenticated: !!Cookies.get("token"),
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
