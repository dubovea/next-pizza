import { useEffect } from "react";
import { QueryFilters } from "./use-filters";
import qs from "qs";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: QueryFilters) => {
  const router = useRouter();
  useEffect(() => {
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.types),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const query = qs.stringify(params, {
      skipNulls: true,
      arrayFormat: "comma",
    });
    router.push(`?${query}`, {
      scroll: false,
    });
  }, [filters, router]);
};
