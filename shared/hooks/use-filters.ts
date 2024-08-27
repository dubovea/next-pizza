import { useRouter, useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useState } from "react";

export interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface FilterProps extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface QueryFilters {
  sizes: Set<string>;
  types: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends QueryFilters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const router = useRouter();
  const searchParams = useSearchParams() as unknown as Map<
    keyof FilterProps,
    string
  >;

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  );

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );

  const [types, { toggle: toggleTypes }] = useSet(
    new Set<string>(
      searchParams.has("pizzaTypes")
        ? searchParams.get("pizzaTypes")?.split(",")
        : []
    )
  );

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  return {
    sizes,
    types,
    selectedIngredients,
    prices,
    setIngredients: toggleIngredients,
    setPrices: updatePrice,
    setSizes: toggleSizes,
    setTypes: toggleTypes,
  };
};
