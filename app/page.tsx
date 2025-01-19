import FormSearch from "./form-search";
import { fetchFrutas } from "@/services/get-products";
import CardFruits from "@/components/card-fruits";

export default async function Home() {
  const data = await fetchFrutas();

  return (
    <>
      <div className="w-full p-4 flex items-center justify-center">
        <FormSearch />
      </div>
      <div className="w-full p-4 flex items-center justify-center">
        {/* <CarouselComponent /> */}
      </div>
      <CardFruits data={data} />
    </>
  );
}
