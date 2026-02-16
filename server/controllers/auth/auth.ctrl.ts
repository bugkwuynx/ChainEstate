const { v4: uuidv4 } = require("uuid");
const { ethers } = require("ethers");
const jwt = require("jsonwebtoken");

const {
  createUser,
  getUsers,
  updateUserNonce,
} = require("../../services/users/users.service");

const { Role } = require("../../types/users.types");

import type { Response } from "express";
import type {
  RegisterRequest,
  LoginRequest,
  User,
  LoginResponse,
} from "../../types/users.types";


export const register = async(
    req: RegisterRequest,
    res: Response<User | {message: string}>
) => {
    try {
        const {walletAddress} = req.body;
        if (!walletAddress) {
            return res.status(400).json({message: `Wallet address is required`});
        }
        
        const normalizedAddress = walletAddress.toLowerCase();
        const existingUser = await getUsers({
            where: {walletAddress: normalizedAddress}
        });

        if (existingUser) {
            return res.status(400).json({message: `User already exists`});
        }

        const nonce = uuidv4();
        const createUserResult = await createUser({
            walletAddress: normalizedAddress,
            role: Role.USER,
            nonce
        });

        res.status(201).json(createUserResult);
    } catch(error) {
        res.status(500).json({
            message: `Internal server error: ${error}`
        });
    }
};

export const login = async(req: LoginRequest, res: Response<LoginResponse | null | {message: string}>) => {
    try {
        const {walletAddress, signature} = req.body;
        const normalizedAddress = walletAddress.toLowerCase();
        
        const getUsersResult: User[] = await getUsers({
            where: {walletAddress: normalizedAddress}
        });

        if (!getUsersResult || getUsersResult.length === 0) {
            return res.status(400).json({message: "User not found"});
        }

        const user: User = getUsersResult[0] as User;

        const now = new Date();
        if (!user.nonceExpiresAt || now > user.nonceExpiresAt) {
            return res.status(400).json({message: "Nonce has expired. Please request a new login"});
        }

        const message = `Sign this message to authenticate: ${user.nonce}`;
        const recoveredAddress = ethers.verifyMessage(message, signature);

        if (recoveredAddress.toLowerCase() !== normalizedAddress) {
            return res.status(401).json({message: "Invalid signature"});
        }

        const nonce = uuidv4();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        const updateUserNonceResult = await updateUserNonce({
            userId: user.id,
            newNonce: nonce,
            nonceExpiresAt: expiresAt
        });

        const token: string = jwt.sign(
            {userId: user.id, role: user.role},
            process.env.JWT_SECRET!,
            {expiresIn: "5 minutes"}
        );

        return res.json({userId: user.id, token});

    } catch(error) {
        res.status(500).json({message: `Internal server error: ${error}`});
    }
};