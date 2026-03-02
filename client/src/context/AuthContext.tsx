import React, { createContext, useContext, useState } from "react";
import { loginWithWallet } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  userId: string | null;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId"),
  );

  const login = async () => {
    const data = await loginWithWallet();
    console.log(data);
    setUserId(data.userId);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("token", data.token);
    navigate("/dashboard", { replace: true });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUserId(null);
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  return context;
};
