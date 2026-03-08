import {ethers} from 'ethers';

const API_URL = import.meta.env.VITE_API_URL;

export const getWalletAddress = async() => {
    const walletAddress = await connectWallet();
    if (!walletAddress) {
        throw new Error('Wallet connection failed');
    }
    return walletAddress;
}

export const connectWallet = async(): Promise<string> => {
    if (!window.ethereum) {
        throw new Error("MetaMask not installed");
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0];
}

export const signNonce = async(walletAddress: string, nonce: string): Promise<string> => {
    const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider);
    const signer = await provider.getSigner();

    const message = `Sign this message to authenticate: ${nonce}`;
    const signature = await signer.signMessage(message);

    return signature;
};

export const loginWithWallet = async() => {
    try {
        // 1. Connect Wallet
        const walletAddress = await connectWallet();
        if (!walletAddress) {
            throw new Error('Wallet connection failed');
        }

        // 2. Request Nonce from Backend
        const nonceResult = await fetch(
            `${API_URL}/auth/nonce?walletAddress=${walletAddress}`,
        );

        if (!nonceResult.ok) {
            throw new Error('Failed to retrieve nonce from server');
        }

        const {nonce} = await nonceResult.json();

        // 3. Sign Nonce
        const signature = await signNonce(walletAddress, nonce);

        if (!signature) {
            throw new Error('Signature failed');
        }

        // 4. Send to Login Endpoint
        const loginResult = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({walletAddress, signature}),
            }
        );

        console.log(loginResult);

        if (!loginResult.ok) {
            throw new Error('Invalid login response from server');
        }

        const result = await loginResult.json();

        const {token, userId} = result;

        console.log(token);

        // 5. Store Token
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        return result;
    } catch(error) {
        console.error("Login with wallet failed", error);
    }
}