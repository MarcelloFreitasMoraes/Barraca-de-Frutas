"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

const FormSearch: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const inputValue = (e.target as HTMLInputElement).value;
      const newQueryString = createQueryString("fruit", inputValue);
      router.push(`/search-result?${newQueryString}`);
    }
  };

  return (
    <>
      <Input className="w-2/4 h-14 rounded-full" placeholder="Digite aqui..." onKeyDown={handleKeyDown} />
    </>
  );
};

export default FormSearch;
