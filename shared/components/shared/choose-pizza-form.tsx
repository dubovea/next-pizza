"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";
import { Ingredient, ProductItem } from "@prisma/client";
import {
  GroupVariants,
  IngredientItem,
  PizzaImage,
  Title,
} from "@/shared/components/shared";
import { Button } from "@/shared/components/ui";
import {
  PizzaSize,
  PizzaType,
  pizzaTypes,
} from "@/shared/contants/pizza";
import { getPizzaDetails } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";
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
  const {
    size,
    type,
    selectedIngredients,
    availablePizzas,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items, pizzaTypes);

  const { textDetaills, totalPrice } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );
  
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
