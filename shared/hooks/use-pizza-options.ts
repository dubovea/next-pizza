import { useEffect, useState } from "react";
import { Variant } from "../components/shared/group-variants";
import { PizzaSize, PizzaType } from "../contants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib";
import { ProductItem } from "@prisma/client";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availablePizzas: Variant[];
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (id: number) => void;
}
export const usePizzaOptions = (
  items: ProductItem[],
  availableSizes: Variant[]
): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(30);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );
  const availablePizzas = getAvailablePizzaSizes(type, items);

  useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      (o) => Number(o.value) === size && !o.disabled
    );
    const availableSize = availableSizes?.find((o) => !o.disabled);
    if (!isAvailableSize && availableSize) {
      setSize(+availableSize.value as PizzaSize);
    }
  }, [type]);

  console.log({
    size,
    type,
    selectedIngredients,
    availablePizzas,
  });
  return {
    size,
    type,
    selectedIngredients,
    availablePizzas,
    setType,
    setSize,
    addIngredient,
  };
};
