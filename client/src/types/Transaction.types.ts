import type { Property } from "./Property.types";
import type { User } from "./User.types";

export interface Transaction {
    id: string;
    propertyId: Property['id'];
    fromAddress: User['walletAddress'];
    toAddress: User['walletAddress'];
    txHash: string;
    blockNumber: string;
    priceWei: number;
    createdAt: Date;
};