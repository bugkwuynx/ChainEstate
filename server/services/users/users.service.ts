import type {NewUser, UpdateNonceRequest, User} from "../../types/users.types";
import type { QueryOptions } from "../../database/queryOptions.types";
const {buildSelectQuery, buildUpdateQuery} = require("../../database/queryBuilder");
const {sql} = require("../../database/db");

export const createUser = async(newUser: NewUser): Promise<User> => {
    const query = `
        INSERT INTO users (
            wallet_address,
            role,
            nonce
        )
        VALUES (
            ${newUser.walletAddress},
            ${newUser.role},
            ${newUser.nonce}
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

    const result = await sql`${query}`;
    if (result && result.length === 0) {
        throw new Error(`Failed to create user`);
    }
    return result[0] as User;
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
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM users ${queryClause}
    `;
    const getUsersResult = await sql.unsafe(query, values);
    return getUsersResult as unknown as User[];
}

export const updateUserNonce = async(updatedNonce: UpdateNonceRequest): Promise<User> => {
    const query = `
        UPDATE users
        SET nonce = ${updatedNonce.newNonce},
            nonce_expires_at = ${updatedNonce.nonceExpiresAt}
        WHERE id = ${updatedNonce.userId}
        RETURNING
            id,
            wallet_address AS "walletAddress",
            role AS "role",
            nonce,
            nonce_expires_at AS "nonceExpiresAt"
            created_at AS "createdAt",
            updated_at AS "updatedAt"
    `;
    const updateUserNonceResult = await sql`${query}`;
    return updateUserNonceResult[0] as User;
};