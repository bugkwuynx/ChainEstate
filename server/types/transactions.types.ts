import {Request, Response} from 'express';
import { User } from './users.types';
import { Listing } from './listings.types';

export interface IncomingTransaction {
    tokenAddress: string;
    fromUser: User['id'];
    toUser: User['id'];
    priceWei: Listing['priceWei'];
}

export interface NewTransaction {
    tokenAddress: string;
    fromUser: User['id'];
    toUser: User['id'];
    priceWei: Listing['priceWei'];
    txHash: string;
    blockNumber: string;
}

export interface Transaction extends NewTransaction {
    id: string;
    txHash: string;
    blockNumber: string;
    createdAt: Date;
}

export interface CreateTransactionRequest extends Request {
    body: IncomingTransaction;
}

export interface GetTransactionRequest extends Request {
    query: {
        tokenAddress?: string;
        fromUser?: string;
        toUser?: string;
        priceWei?: string;
    }
}

export interface GetTransactionByIdRequest extends Request {
    params: {
        id: string;
    }
}