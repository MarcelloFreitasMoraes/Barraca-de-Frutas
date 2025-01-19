'use client'

import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
interface EmptyProps {
    image: StaticImageData
    title: string
}

const Empty: React.FC<EmptyProps> = ({ image, title }) => {
    const { push } = useRouter()
    return (
        <div className='w-full h-[596px] gap-6 flex flex-col items-center text-center p-16 bg-white rounded'>
            <h2 className='bold text-2xl text-black'>{title}</h2>
            <div className='relative w-[433px] h-96 max-md:w-40 max-md:h-52'>
                <Image className='w-full h-auto' src={image} layout="fill" alt="reload" />
            </div>
            <Button className='bg-red-500 w-44' onClick={() => push(`/`)}>Recarregar página</Button>
        </div>
    )
}

export default Empty
