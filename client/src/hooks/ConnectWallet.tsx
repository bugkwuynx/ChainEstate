import { useAuth } from "@/context/AuthContext";

export const ConnectWallet = () => {
  const { login, userId, logout } = useAuth();

  return (
    <div>
      {userId ? (
        <div
          className="secondary-button"
          onClick={logout}
          style={{ cursor: "pointer" }}
        >
          Logout
        </div>
      ) : (
        <div
          className="secondary-button"
          onClick={login}
          style={{ cursor: "pointer" }}
        >
          Connect Wallet
        </div>
      )}
    </div>
  );
};
