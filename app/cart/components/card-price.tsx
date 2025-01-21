'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { IMovieCart, ListData } from '@/services/get-products'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { finalizePurchase } from '@/services/cart-products'
import { PDFDownloadLink } from '@react-pdf/renderer'
import PdfDocument from '@/components/report-pdf'

interface DataPriceProps {
    data: ListData | undefined
}

const CardPrice: React.FC<DataPriceProps> = ({
    data,
}) => {
    const { push } = useRouter()

    const total =
        data &&
        Object.values(data)?.reduce(
            (sum, item) => sum + parseFloat(item?.total),
            0
        )

    const totalSun = total?.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
    })

    const handleButtonClick = async () => {
        // Verifica se há dados disponíveis antes de chamar a função
        if (!data) {
            console.error('Nenhum dado disponível para finalizar a compra.');
            return;
        }

        const pdfDownloadLink = document.getElementById('pdf-download-link');
        if (pdfDownloadLink) {
            pdfDownloadLink.click();
        }

        try {
            // Passa os dados para a função finalizePurchase
            const result = await finalizePurchase(data as IMovieCart);

            if (result) {
                console.log('Compra finalizada com sucesso:', result);
            }

            // Navega para a página de confirmação da compra
            push(`/purchase`);
        } catch (error) {
            console.error('Erro ao finalizar a compra:', error);
        }
    };

    return (
        <Card className='w-full md:w-2/4 mr-15 p-4 h-full'>
            <div className='mb-5 text-center'>
                <h2 className='text-2xl font-bold'>Valor da Compra</h2>
            </div>

            {data &&
                Object.entries(data)?.map(
                    ([, products]: [string, IMovieCart], index) => {
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
                    <h3 className='text-xl font-bold'><sup>R$</sup>{totalSun}</h3>
                </div>
                <Button className='bg-green-700'
                    onClick={handleButtonClick}
                >
                    Finalizar Compra
                </Button>
                <PDFDownloadLink
                    id="pdf-download-link"
                    document={
                        <PdfDocument
                            data={data && Object.values(data)}
                            total={total}
                        />
                    }
                    fileName="boleto.pdf"
                ></PDFDownloadLink>
            </div>
        </Card>
    )
}

export default CardPrice
