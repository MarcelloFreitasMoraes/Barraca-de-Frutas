import { baseUrl } from "./http";
export interface ListData {
  description?: string
  image?: string
  name?: string
  price?: number
  id?: number
  delete?: boolean
  decrement?: boolean
}

export interface IMovieCart extends ListData {
  amount?: number
  total?: number
}


export const fetchFrutas = async () => {
  const url = `${baseUrl}/frutas/list.json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};

export const fetchAllCartMovies = async () => {
  const url = `${baseUrl}/frutas/checkout.json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};