'use client';
import { useAuthStore } from '@/auth/authStore';
import { Button } from '@/components/ui/button';
import React from 'react';

const ButtonCardFruits: React.FC = () => {
    const { isLogged } = useAuthStore()
    return (
        <>
            {isLogged ? (
                <Button className='bg-green-700' onClick={() => { }}>Adicionar ao Carrinho</Button>
            ) : (
                <Button disabled>Logue para comprar</Button>
            )}
        </>
    )
}

export default ButtonCardFruits;