import { useEffect, useRef } from "react";
import { QueryFilters } from "./use-filters";
import qs from "qs";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: QueryFilters) => {
  const isMountRef = useRef(false);
  const router = useRouter();
  useEffect(() => {
    if (isMountRef.current) {
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
    }
    isMountRef.current = true;
  }, [filters, router]);
};
