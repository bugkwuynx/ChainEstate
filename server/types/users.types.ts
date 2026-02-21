import type { Request, Response } from "express";

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}

export interface User extends NewUser {
    id: string;
    nonce: string;
    nonceExpiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface NewUser {
    walletAddress: string;
    role: Role;
    nonce: string;
}

export interface RegisterRequest extends Request {
    body: {
        walletAddress?: string;
    }
}

export interface GetUsersRequest extends Request {
    query: {
        walletAddress?: string;
        role?: Role;
    }
}

export interface getNonceRequest extends Request {
    query: {
        walletAddress: string
    }
}

export interface LoginRequest extends Request {
    body: {
        walletAddress: string;
        signature: string;
    }
}

export interface LoginResponse {
    userId: User["id"];
    token: string;
}

export interface UpdateNonceRequest {
    userId: string;
    newNonce: string;
    nonceExpiresAt: Date;
}