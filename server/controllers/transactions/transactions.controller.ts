import type {
    Transaction,
    CreateTransactionRequest,
    GetTransactionByIdRequest,
    GetTransactionRequest
} from "../../types/transactions.types";
import type { Response } from "express";
import {
    createTransaction,
    getTransactions,
    getTransactionById
} from "../../services/transactions/transactions.service";
import type { User } from "../../types/users.types";
import { getUsers } from "../../services/users/users.service";
import { getProperties } from "../../services/properties/properties.service";
import type { Property } from "../../types/properties.types";

export const createTransactionHandler = async(
    req: CreateTransactionRequest,
    res: Response<Transaction | {message: string}>
) => {
    try {
        const newTransaction = req.body;

        if (!newTransaction.fromUser || !newTransaction.toUser || !newTransaction.tokenAddress || !newTransaction.priceWei) {
            return res.status(400).json({message: "Missing required fields"});
        }

        /**
         * Check if user exists
         */
        const getFromUsersResult: User[] = await getUsers({
            where: {id: newTransaction.fromUser}
        });

        if (!getFromUsersResult || getFromUsersResult.length === 0) {
            return res.status(400).json({message: "From user not found"});
        }

        const getToUsersResult: User[] = await getUsers({
            where: {id: newTransaction.toUser}
        });

        if (!getToUsersResult || getToUsersResult.length === 0) {
            return res.status(400).json({message: "To user not found"});
        }

        /**
         * Check if property exists
         */
        const getPropertiesResult: Property[] | null = await getProperties({
            where: {tokenAddress: newTransaction.tokenAddress}
        });
    
        if (!getPropertiesResult || getPropertiesResult.length === 0) {
            return res.status(400).json({message: "Property not found"});
        }

    } catch (error) {
        res.status(500).json({message: `Error creating transaction" ${error}`});
    }
}

export const getTransactionByIdHandler = async(
    req: GetTransactionByIdRequest,
    res: Response<Transaction | {message: string}>
) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({message: `Transaction id is required`});
        }

        const getTransactionResult = await getTransactionById(id);

        if (!getTransactionResult) {
            return res.status(404).json({message: `Transaction not found`});
        }

        res.status(200).json(getTransactionResult);

    } catch(error) {
        res.status(500).json({message: `Error getting transaction: ${error}`});
    }
}

export const getTransactionsHandler = async(
    req: GetTransactionRequest,
    res: Response<Transaction[] | null | {message: string}>
) => {
    try {
        const queryOptions = req.query;

        const getTransactionsResult = await getTransactions({
            where: queryOptions
        });

        res.status(200).json(getTransactionsResult);
    } catch(error) {
        res.status(500).json({message: `Error getting transaction: ${error}`});
    }
}