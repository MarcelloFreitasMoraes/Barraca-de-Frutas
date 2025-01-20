'use client';

import { IMovieCart } from '@/services/get-products';
import React, { useState } from 'react';
import Image from 'next/image';
import { CircleMinus, CirclePlus, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import CardPrice from './card-price';

const CardCheckout: React.FC<any> = ({ data }) => {
    // const { CartMutation, LoadingCart } = useCartData()
    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    const handleDelete = (key: string, fruit: IMovieCart) => {
        setIsDeleting(true)

        // CartMutation.mutate(
        //     {
        //         key,
        //         ...fruit,
        //         delete: true,
        //     },
        //     {
        //         onSettled: () => {
        //             setIsDeleting(false)
        //         },
        //     }
        // )
    }

    const total =
        data &&
        Object.values(data)?.reduce(
            (sum, item) => sum + parseFloat(item?.total),
            0
        )

    const totalSun = total?.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
    })

    return (
        <div className='flex flex-col md:justify-between md:flex-row p-4'>
            <div className='mr-2 gap-4'>
                {data &&
                    Object.entries(data).map(
                        ([key, fruit]: [string, IMovieCart], index) => {
                            const amount = fruit?.amount ?? 1
                            const totalPrice =
                                amount > 1 ? fruit?.total : fruit?.price
                            const resultTotal =
                                totalPrice?.toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2,
                                }) ?? '0,00'

                            return (
                                <Card
                                    key={`product_${index}`}
                                    className="w-full flex items-center mx-auto mb-4"
                                >
                                    <div className='flex items-center h-full pr-5  md:px-0'>
                                        <Image
                                            src={fruit?.image as string}
                                            alt={fruit?.name as string}
                                            width={250}
                                            height={200}
                                            className='w-full md:w-64 md:w-52 h-auto'
                                        />
                                        <div className='pl-10 flex flex-col w-full h-full max-sm:pt-10'>
                                            <div className='mb-5'>
                                                <h2 className='text-2xl font-bold'>{fruit?.name}</h2>
                                                <h3 className='text-lg font-semibold'>{fruit?.description}</h3>
                                            </div>

                                            <div>
                                                <h2 className='text-2xl font-bold'><sup>R$</sup>{resultTotal}</h2>
                                            </div>

                                            <div className='flex items-center gap-4' >
                                                <span>Quantidade:</span>
                                                <div>
                                                    <CircleMinus color='#A60311' size={16} />
                                                </div>
                                                <Input
                                                    type="text"
                                                    disabled
                                                    value={fruit?.amount}
                                                    className='w-10'
                                                />
                                                <div>
                                                    <CirclePlus color='#A60311'
                                                        size={16} />
                                                </div>
                                                <div
                                                //             // onClick={() => {
                                                //             //     handleDelete(key, fruit);
                                                //             //     setAlert({
                                                //             //         type: 'error',
                                                //             //         message: 'Item removido com sucesso!',
                                                //             //     });
                                                //             // }}
                                                >
                                                    <Trash color='#A60311' size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )
                        }
                    )}
            </div>
            <CardPrice
                data={data}
                total={totalSun}
                setIsDeleting={setIsDeleting}
            />

        </div>
    )
}

export default CardCheckout;
