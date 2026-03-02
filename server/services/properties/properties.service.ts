import type {
    Property,
    NewProperty
} from "../../types/properties.types";
import { buildSelectQuery, buildUpdateQuery } from "../../database/queryBuilder";
import { pool } from "../../database/db";
import { QueryOptions, UpdateQueryOptions } from "../../database/queryOptions.types";

export const createProperty = async(newProperty: NewProperty): Promise<Property> => {
    const query = `
        INSERT INTO properties (
            owner_id,
            token_address,
            title,
            description,
            country,
            city,
            address_line,
            property_type,
            size_sqft,
            year_built
        )
        VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
        )
        RETURNING
            id,
            token_address AS "tokenAddress",
            owner_id AS "ownerId",
            title,
            description,
            country,
            city,
            address_line AS "addressLine",
            property_type AS "propertyType",
            size_sqft AS "sizeSqft",
            year_built AS "yearBuilt",
            is_verified AS "isVerified",
            ipfs_metadata_uri AS "ipfsMetadataUri",
            created_at AS "createdAt"
    `;
    console.log(query);
    console.log(newProperty);

    const keys = Object.keys(newProperty);
    const values = keys.map(key => newProperty[key as keyof typeof newProperty]);
    console.log(values);
    const result = await pool.query(query, values);

    if (!result || result.rows.length === 0) {
        throw new Error(`Failed to create property`);
    }

    console.log(result.rows[0]);

    return result.rows[0] as Property;
}

export const getPropertyById = async(propertyId: string): Promise<Property | null> => {
    const query = `
        SELECT
            id,
            token_address AS "tokenAddress",
            owner_id AS "ownerId",
            title,
            description,
            country,
            city,
            address_line AS "addressLine",
            property_type AS "propertyType",
            size_sqft AS "sizeSqft",
            year_built AS "yearBuilt",
            is_verified AS "isVerified",
            ipfs_metadata_uri AS "ipfsMetadataUri",
            created_at AS "createdAt"
        FROM properties
        WHERE id = $1
    `;

    const values = [propertyId];

    const getPropertyByIdResult = await pool.query(query, values);

    if (getPropertyByIdResult.rows.length === 0) {
        return null;
    }

    return getPropertyByIdResult.rows[0] as Property;
};

export const getProperties = async(queryOptions: QueryOptions): Promise<Property[] | null> => {
    const {queryClause, values} = buildSelectQuery(queryOptions);

    const query = `
        SELECT
            id,
            token_address AS "tokenAddress",
            owner_id AS "ownerId",
            title,
            description,
            country,
            city,
            address_line AS "addressLine",
            property_type AS "propertyType",
            size_sqft AS "sizeSqft",
            year_built AS "yearBuilt",
            is_verified AS "isVerified",
            ipfs_metadata_uri AS "ipfsMetadataUri",
            created_at AS "createdAt"
        FROM properties ${queryClause}
    `;
    
    const getPropertiesResult = await pool.query(query, values);

    return getPropertiesResult.rows as unknown as Property[];
};

export const updateProperty = async(
    propertyId: string,
    updateProperty: Partial<NewProperty>
): Promise<Property | null> => {
    const keys = Object.keys(updateProperty);

    if (!keys.length) {
        throw new Error("No fields provided for update");
    }

    const query = `
        UPDATE properties
        ${buildUpdateQuery(updateProperty as UpdateQueryOptions)}
        WHERE id = $${Object.keys(updateProperty).length + 1}
        RETURNING
            id,
            token_address AS "tokenAddress",
            owner_id AS "ownerId",
            title,
            description,
            country,
            city,
            address_line AS "addressLine",
            property_type AS "propertyType",
            size_sqft AS "sizeSqft",
            year_built AS "yearBuilt",
            is_verified AS "isVerified",
            ipfs_metadata_uri AS "ipfsMetadataUri",
            created_at AS "createdAt"      
    `;

    console.log(query);

    const values = [...Object.values(updateProperty), propertyId];

    const updatePropertyResult = await pool.query(query, values);

    if (updatePropertyResult && updatePropertyResult.rows.length === 0) {
        return null;
    }

    return updatePropertyResult.rows[0] as Property;
}