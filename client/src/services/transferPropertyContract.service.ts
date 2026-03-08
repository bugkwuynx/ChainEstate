import { ethers } from "ethers";
import PropertyNFTArtifact from "../abi/PropertyNFT.json";

const provider = new ethers.JsonRpcProvider(import.meta.env.RPC_URL!);
const CONTRAACT_ADDRESS =     import.meta.env.PROPERTY_NFT_ADDRESS!;

const signer = new ethers.Wallet(
    import.meta.env.RPC_PRIVATE_KEY!,
    provider
);

const contract = new ethers.Contract(
    CONTRAACT_ADDRESS,
    PropertyNFTArtifact.abi ?? PropertyNFTArtifact,
    signer
);

export const mintProperty = async(ownerAddress: string, physicalAddress: string) => {
    const tx = await contract.mintProperty(ownerAddress, physicalAddress);

    const receipt = await tx.wait();

    return {
        success: true,
        txHash: receipt.hash,
        tokenId: receipt.tokenId
    }
}

export const approveMarketplace = async(tokenId: number) => {
    const tx = await contract.approve(CONTRAACT_ADDRESS, tokenId);

    const receipt = await tx.wait();
    
    return {
        success: true,
        txHash: receipt.hash
    };
}

export const listProperty = async(tokenId: number, priceWei: number) => {
    const tx = await contract.listProperty(tokenId, priceWei);

    const receipt = await tx.wait();

    return {
        success: true,
        txHash: receipt.hash
    };
}

export const cancelListing = async(tokenId: number) => {
    const tx = await contract.cancelListing(tokenId);

    const receipt = await tx.wait();

    return {
        success: true,
        txHash: receipt.hash
    };
};

export const updateListing = async(tokenId: number, newPriceWei: number) => {
    const tx = await contract.updateListing(tokenId, newPriceWei);

    const receipt = await tx.wait();

    return {
        success: true,
        txHash: receipt.hash
    };
}

export const buyProperty = async(tokenId: number, priceWei: number) => {
    const tx = await contract.buyProperty(tokenId, {value: priceWei});

    const receipt = await tx.wait();

    return {
        success: true,
        txHash: receipt.hash
    };
}

export const readProperty = async(tokenId: number) => {
    const property = await contract.properties(tokenId);

    return {
        tokenId: String(property.tokenId),
        physicalAddress: property.physicalAddress
    }
}

export const readListing = async(tokenId: number) => {
    const listing = await contract.listings(tokenId);

    return {
        seller: listing.seller,
        priceWei: listing.priceWei.toString(),
        isActive: listing.isActive
    };
}


