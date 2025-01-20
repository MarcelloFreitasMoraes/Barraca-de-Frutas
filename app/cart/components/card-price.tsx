'use client'
import React, { useState } from 'react'
// import { PDFDownloadLink } from '@react-pdf/renderer'
// import PdfDocument from '../../../components/ReportPdf'
// import {
//     Aside,
//     Finish,
//     HeadingPrice,
//     Items,
//     ListProducts,
//     Total,
// } from './CardCheckout.styles'
// import { DataPriceProps } from './types'
// import { IMovieCart } from '@/hooks/types'
// import TypographicComponent from '@/components/Typographic/Typographic'
// import { Button } from '@/components'
// import useCartData from '@/hooks/useCheckData'
import { useRouter } from 'next/navigation'
import { IMovieCart } from '@/services/get-products'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const CardPrice: React.FC<any> = ({
    data,
    total,
    setIsDeleting,
}) => {
    // const { DeleteAll, LoadingCart } = useCartData()
    const { push } = useRouter()

    // const handleButtonClick = () => {
    //     setIsDeleting(true)
    //     const pdfDownloadLink = document.getElementById('pdf-download-link')
    //     if (pdfDownloadLink) {
    //         pdfDownloadLink.click()
    //     }
    //     DeleteAll()
    //     push(`/purchase`)
    // }
    return (
        <Card className='w-full md:w-2/4 mr-15 p-4 h-full'>
            <div className='mb-5 text-center'>
                <h2 className='text-2xl font-bold'>Valor da Compra</h2>
            </div>

            {data &&
                Object.entries(data)?.map(
                    ([_, products]: [string, IMovieCart], index) => {
                        const price =
                            products?.total?.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            }) ?? '0,00'
                        return (
                            <React.Fragment key={`product_${index}`}>
                                <div className='flex justify-between'>
                                    <ul className='my-2.5 list-none'>
                                        <li>
                                            <span>
                                                [{products?.amount ?? 0}x]
                                            </span>
                                            <span className="uper">
                                                {products?.name ??
                                                    'Não encontrado'}
                                            </span>
                                        </li>
                                    </ul>

                                    <div className='my-2.5 list-none'>
                                        <li>
                                            <h3 className='text-xl font-bold'><sup>R$</sup>{price}</h3>
                                        </li>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    }
                )}

            <div className='flex flex-col items-center mt-5'>
                <div className='mb-12 mt-15 flex justify-between w-full'>
                    <h3 className='text-xl font-bold uppercase'>Total</h3>
                    <h3 className='text-xl font-bold'><sup>R$</sup>{total}</h3>
                </div>
                <Button className='bg-green-700'
                // disabled={LoadingCart} onClick={handleButtonClick}
                >
                    Finalizar Compra
                </Button>
                {/* <PDFDownloadLink
                    id="pdf-download-link"
                    document={
                        <PdfDocument
                            data={data && Object.values(data)}
                            total={total}
                        />
                    }
                    fileName="boleto.pdf"
                ></PDFDownloadLink> */}
            </div>
        </Card>
    )
}

export default CardPrice
