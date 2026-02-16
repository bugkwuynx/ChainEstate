import type { User } from "./User.types";

export interface Image {
    id: string;
    propertyId: Property['id'];
    imageUrl: string;
}

export interface Property {
    id: string;
    tokenId: string;
    ownerAddress: User['walletAddress'];
    title: string;
    description: string | null;
    country: string;
    city: string;
    addressLine: string;
    propertyType: string;
    sizeSqft: number;
    yearBuilt: number;
    isVerified: boolean;
    ipfsMetadataUri: string | null;
    createdAt: Date;
}

export interface PropertyDetail extends Property {
    history: PropertyHistoryEntry[];
    images: Image[];
};

export interface PropertyDocument {
    id: string;
    propertyId: string;
    documentType: string;
    ipfsUri: string;
    createdAt: Date;
}

export interface Listing extends Property {
    sellerAddress: User['walletAddress'];
    priceWei: number;
    isActive: boolean;
    createdAt: Date,
    closedAt: Date
}

export interface PropertyHistoryEntry {
    date: string;
    event: string;
    owner: User['walletAddress'];
    priceWei?: number;
  };