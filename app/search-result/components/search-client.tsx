'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Logo from '../../../public/not-product.png'
import Mobile from '../../../public/not-product-mobile.png'
import { ListData } from '@/services/get-products'
import FormSearch from '@/app/form-search'
import CardFruits from '@/components/card-fruits'
import { useWindowResize } from '@/constants/useWindowResize'
import Empty from '@/components/empty'

const SearchClient: React.FC<{ fruit: string, ListProductsQuery: ListData }> = ({ fruit, ListProductsQuery }) => {
    const [filterValue, setFilterValue] = useState<string>(fruit)
    const showArrows = useWindowResize(768, true)
    const Image = showArrows ? Mobile : Logo

    useEffect(() => {
        if (fruit) {
            setFilterValue(fruit)
        }
    }, [fruit])

    const filteredProducts = useMemo(() => {
        if (!ListProductsQuery) return []

        return Object.entries(ListProductsQuery).flatMap(([, productsArray]) =>
            productsArray.filter((product: ListData) =>
                product?.name?.toLowerCase().includes(filterValue)
            )
        )
    }, [ListProductsQuery, filterValue])

    return (
        <>
            <div className="w-full p-4 flex items-center justify-center">
                <FormSearch />
            </div>
            <>
                {filteredProducts.length > 0 ? (
                    <div>
                        <CardFruits data={filteredProducts} />
                    </div>
                ) : (
                    <Empty
                        image={Image}
                        title="Parece que não há nada por aqui :("
                    />
                )}
            </>
        </>
    )
}

export default SearchClient
