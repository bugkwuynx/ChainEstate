export interface QueryOptions {
    where?: Record<string, any>,
    orderBy?: string;
    limit?: number;
    offset?: number;
}

export interface UpdateQueryOptions extends QueryOptions {
    set: Record<string, any>;
}

export interface QueryResult {
    queryClause: string;
    values: any[];
}