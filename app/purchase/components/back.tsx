'use client'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const Back: React.FC = () => {
    const { push } = useRouter()
    return <Button className='w-[173px]' onClick={() => push(`/`)}>Voltar</Button>
}

export default Back;