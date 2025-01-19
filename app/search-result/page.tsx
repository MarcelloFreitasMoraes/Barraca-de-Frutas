import React from 'react';
import SearchClient from './components/search-client';
import { fetchFrutas } from '@/services/get-products';

interface Params {
    searchParams: { fruit: string };
}

const SearchResult: React.FC<Params> = async ({ searchParams }) => {
    const data = await fetchFrutas();

    return (
        <SearchClient fruit={searchParams.fruit || ''} ListProductsQuery={data} />
    );
};

export default SearchResult;
