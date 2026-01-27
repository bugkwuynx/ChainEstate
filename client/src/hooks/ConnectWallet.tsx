import { ethers } from "ethers";
import { useState } from "react";

export const ConnectWallet = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);

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
            console.log("Connected to wallet:", account);
            console.log("Signer:", signer);

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
            console.log("Signature: ", signature);
            console.log("Account: ", account);
            setLoggedIn(true);
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