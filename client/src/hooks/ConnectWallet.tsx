import { ethers } from "ethers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ConnectWallet = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    
    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("MetaMask is not installed. Please install it to use this app.");
            return null;
        }
    
        try {
            const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
            const account = accounts[0];
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            await loginWithWallet(account);

            return true;
        } catch (error) {
            console.error("User rejected the request or error occurred:", error);
            alert("Failed to connect wallet. Please try again.");
            return false;
        }
    };

    const loginWithWallet = async (account: string) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const message = `Sign this message to log in. Nonce: ${Date.now()}`;

        try {
            const signature = await signer.signMessage(message);
            setLoggedIn(true);
            localStorage.setItem("walletAddress", account);
            navigate("/dashboard");
        } catch (error) {
            console.error("User rejected signature: ", error);
        }
    };

    return (
        <div>
            {!loggedIn ? (
                <div className="secondary-button" onClick={connectWallet} style={{ cursor: "pointer" }}>
                    Connect Wallet
                </div>
            ) : (
                <div>
                    <p>Logged in</p>
                </div>
            )}
        </div>
    );
};