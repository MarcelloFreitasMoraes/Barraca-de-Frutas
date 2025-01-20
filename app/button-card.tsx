'use client';
import { useAuthStore } from '@/auth/authStore';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { addMovieToCart } from '@/services/cart-products';
import { ListData } from '@/services/get-products';
import React from 'react';

interface ButtonCardFruitsProps {
    product: ListData
}

const ButtonCardFruits: React.FC<ButtonCardFruitsProps> = ({ product }) => {
    const { isLogged } = useAuthStore()

    const handleAddToCart = async (item: ListData) => {
        try {
            const post = await addMovieToCart(item);
            if (post && post.success) {
                console.log("Produto adicionado ao carrinho", post);
                toast({
                    title: "Sucesso!",
                    description: "Produto adicionado ao carrinho!",
                });
            } else {
                throw new Error("Falha ao adicionar produto ao carrinho");
            }
        } catch (error) {
            console.error("Erro ao adicionar ao carrinho", error);
            toast({
                title: "Erro!",
                description: "Erro ao adicionar ao carrinho!",
            });
        }
    };


    return (
        <>
            {isLogged ? (
                <Button className='bg-green-700' onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</Button>
            ) : (
                <Button disabled>Logue para comprar</Button>
            )}
        </>
    )
}

export default ButtonCardFruits;