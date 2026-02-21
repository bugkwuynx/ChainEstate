import type {NewUser, UpdateNonceRequest, User} from "../../types/users.types";
import type { QueryOptions } from "../../database/queryOptions.types";
const {buildSelectQuery, buildUpdateQuery} = require("../../database/queryBuilder");
const {pool} = require("../../database/db");

export const createUser = async(newUser: NewUser): Promise<User> => {
    const query = `
        INSERT INTO users (
            wallet_address,
            role,
            nonce
        )
        VALUES (
            $1, $2, $3
        )
        RETURNING
            id,
            wallet_address AS "walletAddress",
            nonce,
            nonce_expires_at AS "nonceExpiresAt",
            role AS "role",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
    `;

    const values = [newUser.walletAddress, newUser.role, newUser.nonce];
    const result = await pool.query(query, values);
    if (result && result.length === 0) {
        throw new Error(`Failed to create user`);
    }
    return result.rows[0] as User;
};

export const getUsers = async(
    queryOptions: QueryOptions
): Promise<User[]> => {
    const {queryClause, values} = buildSelectQuery(queryOptions);
    const query = `
        SELECT
            id,
            wallet_address AS "walletAddress",
            role AS "role",
            nonce,
            nonce_expires_at AS "nonceExpiresAt",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM users ${queryClause}
    `;
    const getUsersResult = await pool.query(query, values);
    return getUsersResult.rows as unknown as User[];
}

export const updateUserNonce = async(updatedNonce: UpdateNonceRequest): Promise<User> => {
    const query = `
        UPDATE users
        SET nonce = $1,
            nonce_expires_at = $2
        WHERE id = $3
        RETURNING
            id,
            wallet_address AS "walletAddress",
            role AS "role",
            nonce,
            nonce_expires_at AS "nonceExpiresAt",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
    `;
    
    const value = [updatedNonce.newNonce, updatedNonce.nonceExpiresAt, updatedNonce.userId];
    const updateUserNonceResult = await pool.query(query, value);
    return updateUserNonceResult.rows[0] as User;
};