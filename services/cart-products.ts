import { IMovieCart } from "./get-products";
import { baseUrl } from "./http";

export const addMovieToCart = async (restValues: IMovieCart) => {
    const body = { ...restValues, amount: 1 }
    try {
        const res = await fetch(`${baseUrl}/frutas/checkout.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            throw new Error('Erro ao processar a solicitação');
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error(error, 'Erro ao processar a solicitação');
    }
};

export const updateMovieInCart = async (entryKey: string,
    existingItem: { amount: number; price: string },
    restValues: IMovieCart,
    decrement: boolean) => {
    const currentAmount = existingItem?.amount
    const newAmount = decrement ? currentAmount - 1 : currentAmount + 1

    if (newAmount === 0) {
        return removeMovieFromCart(entryKey)
    }
    const updatedValues = {
        ...restValues,
        amount: newAmount,
        total: (parseFloat(existingItem.price) * newAmount).toFixed(2),
    }


    try {
        const res = await fetch(`${baseUrl}/frutas/checkout/${entryKey}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedValues),
        });

        if (!res.ok) {
            throw new Error('Erro ao processar a solicitação');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error, 'Erro ao processar a solicitação');
    }
};

export const removeMovieFromCart = async (key: string) => {
    try {
        const res = await fetch(`${baseUrl}/frutas/checkout/${key}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!res.ok) {
            throw new Error('Erro ao processar a solicitação');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error, 'Erro ao processar a solicitação');

    }
};

export const finalizePurchase = async (products: IMovieCart) => {
    const existingEntries = products ? Object.entries(products) : [];
    const itemKeys = existingEntries.map(([key]) => key);

    try {
        const responses = await Promise.all(
            itemKeys.map((key) =>
                fetch(`${baseUrl}/frutas/checkout/${key}.json`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            )
        );

        const results = await Promise.all(
            responses.map((res) => {
                if (!res.ok) {
                    throw new Error('Erro ao processar a solicitação');
                }
                return res.json();
            })
        );

        return results;
    } catch (error) {
        console.error(error, 'Erro ao processar a solicitação');
        return null;
    }
};
