"use client";

import { cn } from "@/shared/lib/utils";
import React, { useEffect, useState } from "react";
import { Ingredient, ProductItem } from "@prisma/client";
import {
  GroupVariants,
  IngredientItem,
  PizzaImage,
  Title,
} from "@/shared/components/shared";
import { Button } from "@/shared/components/ui";
import {
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from "@/shared/contants/pizza";
import { useSet } from "react-use";
import { calcTotalPizzaPrice } from "@/shared/lib";
interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {
  const [size, setSize] = useState<PizzaSize>(30);
  const [type, setType] = useState<PizzaType>(1);
  const textDetaills = `${size} см, ${mapPizzaType[type]} пицца`;

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);
  const availablePizzas = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }));

  useEffect(() => {
    const isAvailableSize = availablePizzas?.find(
      (o) => Number(o.value) === size && !o.disabled
    );
    const availableSize = availablePizzas?.find((o) => !o.disabled);
    if (!isAvailableSize && availableSize) {
      setSize(+availableSize.value as PizzaSize);
    }
  }, [type]);

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availablePizzas}
            value={`${size}`}
            onClick={(value) => setSize(+value as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={`${type}`}
            onClick={(value) => setType(+value as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={() => onSubmit(items[0].id, Array.from(selectedIngredients))}
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
