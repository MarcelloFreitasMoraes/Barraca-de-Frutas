import React from 'react';
import { Card } from './ui/card';
import Image from "next/image";
import { ListData } from '@/services/get-products';
import ButtonCardFruits from '@/app/button-card';

interface CardFruitsProps {
  data: ListData[] | Record<string, ListData[]>
}

const CardFruits: React.FC<CardFruitsProps> = ({ data }) => {
  const isObjectWithEntries = data && typeof data === 'object' && !Array.isArray(data);

  const products = isObjectWithEntries
    ? Object.values(data).flat()
    : (data as ListData[]);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-screen-xl">
      {products &&
        products.map((product: ListData, index: number) => (
          <Card
            key={`product_${index}`}
            className="w-64 h-full flex flex-col items-center gap-2 p-4 mx-auto"
          >
            <div className='w-full h-full sm:w-52 sm:h-60'>
              <Image
                src={product.image ?? "/path/to/default/image.jpg"}
                alt={product.name || "fruit"}
                width={200}
                height={200}
                className="w-full h-full object-fill"
              />
            </div>
            <div className="gap-2 p-2 flex flex-col">
              <h2 className="text-xl text-black font-bold">
                {product.name}
              </h2>
              <h4 className="text-sm text-black font-normal">
                {product.description}
              </h4>
              <p className="text-xl text-black font-bold">
                <sup>R$</sup>
                {product.price?.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                }) ?? "0,00"}
              </p>
            </div>
            <ButtonCardFruits />
          </Card>
        ))}
    </div>
  );
}

export default CardFruits;
