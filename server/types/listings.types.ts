import type {Request, Response} from 'express';

export interface NewListing {
    propertyId: string;
    sellerId: string;
    priceWei: number;
    isActive: boolean;
}

export interface Listing extends NewListing {
    id: string;
    createdAt: Date;
    closedAt: Date;
}

export interface CreateListingRequest extends Request {
    body: NewListing;
}

export interface GetListingsRequest extends Request {
    query: {
        propertyId?: string,
        sellerId?: string,
        priceWei?: string,
        isActive?: string,
    }
}

export interface GetListingByIdRequest extends Request {
    params: {
        id: string
    }
}

export interface UpdateListingRequest extends Request {
    params: {
        id: string
    }
    body: Partial<NewListing>
}