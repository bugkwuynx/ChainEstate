import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const walletAddress = localStorage.getItem("walletAddress");
    if (!walletAddress) {
        return <Navigate to="/login" />;
    }
    return children;
};