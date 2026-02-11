import type { QueryOptions, QueryResult, UpdateQueryOptions } from "./queryOptions.types.js";
import { camelToSnake } from "../utils/camelToSnakeCase.js";

export const buildSelectQuery = (options: QueryOptions): QueryResult => {
    const {where = {}, orderBy, limit, offset} = options;
    const values: any[] = [];
    let index = 1;
    let query = `WHERE 1=1`;

    /**
     * WHERE clauses
     */
    for (const[key, value] of Object.entries(where)) {
        if (value !== undefined) {
            query += ` AND ${camelToSnake(key)} = $${index}`;
            values.push(value);
            index += 1;
        }
    }

    /**
     * ORDER BY
     */
    if (orderBy) {
        query += ` ORDER BY ${orderBy}`;
    }

    /**
     * LIMIT
     */
    if (limit) {
        query += ` LIMIT $${index++}`;
        values.push(limit);
    }

    /**
     * OFFSET
     */
    if (offset) {
        query += ` OFFSET $${index++}`;
        values.push(offset);
    }
    
    return {queryClause: query, values};
}

export const buildUpdateQuery = (options: UpdateQueryOptions): string => {
    let query: string = `SET `;
    let index: number = 1;

    for (const[key, value] of Object.entries(options)) {
        if (value !== undefined) {
            query += `${camelToSnake(key)} = $${index++}`;
        }
    }
    query = query.slice(0, -1);
    return query;
}