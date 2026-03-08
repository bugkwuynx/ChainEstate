import { Transaction, NewTransaction } from "../../types/transactions.types";
import { buildSelectQuery } from "../../database/queryBuilder";
import { pool } from "../../database/db";
import { QueryOptions } from "../../database/queryOptions.types";

export const createTransaction = async(newTransaction: NewTransaction): Promise<Transaction> => {
    const query = `
        INSERT INTO transactions (
            from_user,
            to_user,
            tx_hash,
            block_number,
            price_wei,
            token_address
        )
        VALUES (
            $1, $2, $3, $4, $5, $6
        )
        RETURNING
            id,
            from_user AS "fromUser",
            to_user AS "toUser",
            tx_hash AS "txHash",
            price_wei AS "priceWei",
            token_address AS "tokenAddress",
            created_at AS "createdAt"
    `;

    const values = [
        newTransaction.fromUser,
        newTransaction.toUser,
        newTransaction.txHash,
        newTransaction.blockNumber,
        newTransaction.priceWei,
        newTransaction.tokenAddress
    ];

    const result = await pool.query(query, values);

    if (!result || result.rows.length === 0) {
        throw new Error(`Failed to create a new transaction.`);
    }

    return result.rows[0] as Transaction;
}

export const getTransactionById = async(id: string): Promise<Transaction | null> => {
    const query = `
        SELECT
            id,
            from_user AS "fromUser",
            to_user AS "toUser",
            tx_hash AS "txHash",
            price_wei AS "priceWei",
            token_address AS "tokenAddress",
            created_at AS "createdAt"
        FROM transactions
        WHERE id = $1
    `;

    const values = [id];

    const getTransactionByIdResult = await pool.query(query, values);

    if (getTransactionByIdResult.rows.length === 0) {
        return null;
    }

    return getTransactionByIdResult.rows[0] as Transaction;
}

export const getTransactions = async(queryOptions: QueryOptions): Promise<Transaction[] | null> => {
    const {queryClause, values} = buildSelectQuery(queryOptions);

    const query = `
        SELECT
            id,
            from_user AS "fromUser",
            to_user AS "toUser",
            tx_hash AS "txHash",
            price_wei AS "priceWei",
            token_address AS "tokenAddress",
            created_at AS "createdAt"
        FROM transactions ${queryClause}
    `;

    const getTransactionsResult = await pool.query(query, values);

    return getTransactionsResult.rows as unknown as Transaction[];
}