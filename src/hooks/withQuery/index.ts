import { useMemo } from 'react';

interface QueryParams {
    [key: string]: string | string[] | boolean | null | undefined;
}

const encodeValue = (value: string | string[] | boolean) => {
    if (Array.isArray(value)) {
        return value.map(v => encodeURIComponent(v)).join(',');
    }
    if (typeof value === 'boolean') {
        return value ? 'true' : 'false';
    }
    return encodeURIComponent(value);
};

const buildQuery = (params: QueryParams) => {
    const queryString = Object.entries(params)
        .map(([key, value]) => {
            if (value !== null && value !== undefined && value !== '' && (!Array.isArray(value) || value.length > 0)) {
                return `${encodeURIComponent(key)}=${encodeValue(value)}`;
            }
            return '';
        })
        .filter(Boolean)
        .join('&');

    return queryString ? `?${queryString}` : '';
};

const useQuery = (params: QueryParams) => {
    return useMemo(() => buildQuery(params), [params]);
};

export default useQuery;