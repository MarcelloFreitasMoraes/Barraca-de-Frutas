import Image from 'next/image'
import React from 'react'
import Logo from '../../public/complet.png'
import Back from './components/back'
import { Card } from '@/components/ui/card'

const Purchase: React.FC = () => {
    return (
        <div className='flex justify-end items-center flex-col gap-4 p-4 mt-10'>
            <Card className='p-8 flex justify-end items-center flex-col'>
                <h2 className='text-2xl font-bold'>Compra realizada com sucesso!</h2>
                <Image src={Logo} alt="car" width={294} height={307} className='max-md:w-60 max:md:h-64 w-72 h-[307px]' />
                <Back />
            </Card>
        </div>
    )
}

export default Purchase
