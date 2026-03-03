import type { NewListing, Listing } from "../../types/listings.types";
import { buildSelectQuery, buildUpdateQuery } from "../../database/queryBuilder";
import { pool } from "../../database/db";
import { QueryOptions, UpdateQueryOptions } from "../../database/queryOptions.types";

export const createListing = async(newListing: NewListing): Promise<Listing> => {
    const query = `
        INSERT INTO listings (
            property_id,
            seller_id,
            price_wei,
            is_active
        )
        VALUES (
            $1, $2, $3, $4
        )
        RETURNING
            id,
            property_id AS "propertyId",
            seller_id AS "sellerId",
            price_wei AS "priceWei",
            is_active AS "isActive",
            created_at AS "createdAt",
            closed_at AS "closedAt"
    `;

    const values = [
        newListing.propertyId,
        newListing.sellerId,
        newListing.priceWei,
        newListing.isActive
    ];

    const result = await pool.query(query, values);

    if (!result || result.rows.length === 0) {
        throw new Error(`Failed to create listing`);
    }

    return result.rows[0] as Listing;
}

export const getListingById = async(id: string): Promise<Listing | null> => {
    const query = `
        SELECT
            id,
            property_id AS "propertyId",
            seller_id AS "sellerId",
            price_wei AS "priceWei",
            is_active AS "isActive",
            created_at AS "createdAt",
            closed_at AS "closedAt"
        FROM listings
        WHERE id = $1
    `;

    const values = [id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0] as Listing;
}

export const getListings = async(queryOptions: QueryOptions): Promise<Listing[] | null> => {
    const {queryClause, values} = buildSelectQuery(queryOptions);

    const query = `
        SELECT
            id,
            property_id AS "propertyId",
            seller_id AS "sellerId",
            price_wei AS "priceWei",
            is_active AS "isActive",
            created_at AS "createdAt",
            closed_at AS "closedAt"
        FROM listings ${queryClause}
    `;

    const result = await pool.query(query, values);

    return result.rows as unknown as Listing[];
}

export const updateListing = async(
    id: string,
    updateListing: Partial<NewListing>
): Promise<Listing | null> => {
    const key = Object.keys(updateListing);

    if (!key.length) {
        throw new Error("No fields provided for update");
    }

    const query = `
        UPDATE listings
        ${buildUpdateQuery(updateListing as UpdateQueryOptions)}
        WHERE id = $${Object.keys(updateListing).length + 1}
        RETURNING
            id,
            property_id AS "propertyId",
            seller_id AS "sellerId",
            price_wei AS "priceWei",
            is_active AS "isActive",
            created_at AS "createdAt",
            closed_at AS "closedAt"
    `;

    const values = [...Object.values(updateListing), id];

    const result = await pool.query(query, values);

    if (result && result.rows.length === 0) {
        return null;
    }

    return result.rows[0] as Listing;
}