import { fetchAllCartMovies } from '@/services/get-products';
import React from 'react';
import CardCheckout from './components/card-checkout';

const Cart: React.FC = async () => {
    const data = await fetchAllCartMovies();

    return <CardCheckout data={data} />
}

export default Cart;