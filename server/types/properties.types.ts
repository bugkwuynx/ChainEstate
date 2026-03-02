import type {Request, Response} from 'express';
import type { User } from './users.types';

export interface Image {
    id: string;
    propertyId: Property['id'];
    imageUrl: string;
}

export interface NewProperty {
    tokenAddress: string | null;
    ownerId: User['walletAddress'];
    title: string;
    description: string | null;
    country: string;
    city: string;
    addressLine: string;
    propertyType: string;
    sizeSqft: number;
    yearBuilt: number;
    ipfsMetadataUri: string | null;
}

export interface Property extends NewProperty {
    id: string;
    isVerified: boolean;
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

export interface PropertyHistoryEntry {
    date: string;
    event: string;
    owner: User['walletAddress'];
    priceWei?: number;
};

export interface CreatePropertyRequest extends Request {
    body: NewProperty
};


export interface GetPropertiesRequest extends Request {
    query: {
        ownerId?: string,
        title?: string;
        country?: string;
        city?: string;
        addressLine?: string;
        propertyType?: string;
        sizeSqft?: string;
        yearBuilt?: string; 
    }
}

export interface GetPropertyByIdRequest extends Request {
    params: {
        propertyId: string;
    }
}

export interface UpdatePropertyRequest extends Request {
    params: {
        propertyId: string;
    };
    body: Partial<NewProperty>;
}