'use client';
import { IMovieCart, ListData } from '@/services/get-products';
import React from 'react';
import Image from 'next/image';
import { CircleMinus, CirclePlus, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import CardPrice from './card-price';
import { toast } from '@/hooks/use-toast';
import { removeMovieFromCart } from '@/services/cart-products';
import { useRouter } from 'next/navigation';
import Empty from '@/components/empty';
import Logo from '../../../public/not-product.png'
import Mobile from '../../../public/not-product-mobile.png'
import { useWindowResize } from '@/constants/useWindowResize';

interface DataProps {
    data: ListData | undefined
}

const CardCheckout: React.FC<DataProps> = ({ data }) => {
    const router = useRouter()
    const showArrows = useWindowResize(768, true)
    const Imagem = showArrows ? Mobile : Logo
    const handleDelete = async (key: string) => {
        try {
            await removeMovieFromCart(key);
            toast({
                title: 'Sucesso!',
                description: 'Item removido com sucesso!',
            });
            router.refresh()
        } catch (error) {
            toast({
                title: 'Erro!',
                description: 'Não foi possível remover o item. Tente novamente.',
                variant: 'destructive',
            });
            throw error;
        } 
    };
    console.log(data, 'data');

    return (
        <div className='flex flex-col md:justify-between md:flex-row p-4'>
            {data ? (
                <>
            <div className='mr-2 gap-4'>
                        {data &&
                            Object.entries(data).map(
                                ([key, fruit]: [string, IMovieCart], index) => {
                                    const amount = fruit?.amount ?? 1;
                                    const totalPrice = amount > 1 ? fruit?.total : fruit?.price;
                                    const resultTotal = totalPrice?.toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2,
                                    }) ?? '0,00';

                                    return (
                                        <Card
                                            key={`product_${index}`}
                                            className="w-full flex items-center mx-auto mb-4"
                                        >
                                            <div className='flex items-center h-full pr-5  md:px-0'>
                                                <Image
                                                    src={fruit?.image ?? ''}
                                                    alt={fruit?.name ?? 'fruit'}
                                                    width={250}
                                                    height={200}
                                                    className='w-full md:w-64 md:h-52 h-auto' />
                                                <div className='pl-10 flex flex-col w-full h-full max-sm:pt-10'>
                                                    <div className='mb-5'>
                                                        <h2 className='text-2xl font-bold'>{fruit?.name}</h2>
                                                        <h3 className='text-lg font-semibold'>{fruit?.description}</h3>
                                                    </div>

                                                    <div>
                                                        <h2 className='text-2xl font-bold'><sup>R$</sup>{resultTotal}</h2>
                                                    </div>

                                                    <div className='flex items-center gap-4'>
                                                        <span>Quantidade:</span>
                                                        <div>
                                                            <CircleMinus color='#A60311' size={16} />
                                                        </div>
                                                        <Input
                                                            type="text"
                                                            disabled
                                                            value={fruit?.amount ?? 1}
                                                            className='w-10' />
                                                        <div>
                                                            <CirclePlus color='#A60311'
                                                                size={16} />
                                                        </div>
                                                        <div
                                                            onClick={() => {
                                                                handleDelete(key);
                                                            }}
                                                        >
                                                            <Trash color='#A60311' size={16} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                }
                            )}
                    </div>
                    <CardPrice
                        data={data} />
                </>
            ) : (
                <Empty
                    image={Imagem}
                    title="Parece que não há nada por aqui :("
                />
            )}
        </div>
    )
}

export default CardCheckout;
