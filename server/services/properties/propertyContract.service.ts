import { ethers } from "ethers";
import PropertyNFTArtifact from "../../abi/PropertyNFT.json";

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL!);

// Backend wallet must be contract owner
const signer = new ethers.Wallet(
    process.env.RPC_PRIVATE_KEY!,
    provider
);

const propertyContract = new ethers.Contract(
    process.env.PROPERTY_NFT_ADDRESS!,
    PropertyNFTArtifact.abi ?? PropertyNFTArtifact,
    signer
) as any;

export const mintPropertyOnChain = async(
    ownerAddress: string,
    physicalAddress: string,
    tokenURI: string
) => {
    try {
        tokenURI = "empty for now";

        console.log(ownerAddress);
        console.log(physicalAddress);
        console.log(tokenURI);

        console.log(process.env.RPC_URL!);

        const tx = await propertyContract.mintProperty(
            ownerAddress,
            physicalAddress,
            tokenURI
        );

        const receipt = await tx.wait();

        console.log(`Receipt: ${receipt}`);

        // Extract tokenId from event
        const event = receipt.logs
            .map((log: any) => {
                try {
                    return propertyContract.interface.parseLog(log);
                } catch {
                    return null;
                }
            })
            .find((e: any) => e?.name === "PropertyMinted");

        const tokenId = event?.args?.tokenId?.toString();

        console.log(`Token Id: ${tokenId}`);
        const owner = await propertyContract.ownerOf(tokenId);
        console.log("Owner: ", owner);

        return {
            success: true,
            tokenId,
            txHash: receipt.hash,
            tokenAddress: process.env.PROPERTY_NFT_ADDRESS
        }
    } catch (error: any) {
        console.error("Mint failed", error);
        throw new Error(error.reason || "Mint transaction failed");
    }
}