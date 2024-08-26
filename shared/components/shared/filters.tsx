"use client";

import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useIngredients } from "@/shared/hooks/use-ingredients";

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIds } = useIngredients();
  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));
  const [{ priceFrom, priceTo }, setPrice] = React.useState<PriceProps>({
    priceFrom: 0,
    priceTo: 5000,
  });
  const limit = 6;

  const onChangePrice = (name: keyof PriceProps, value: number) => {
    setPrice((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-extrabold" />
      {/* Верхние чекбоксы */}
      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
      />
      
      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={priceFrom}
            onChange={(e) => onChangePrice("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            min={0}
            max={1000}
            placeholder="1000"
            value={priceTo}
            onChange={(e) => onChangePrice("priceTo", Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[priceFrom, priceTo]}
          onValueChange={([from, to]) =>
            setPrice({ priceFrom: from, priceTo: to })
          }
        />
      </div>
      {/* Фильтр ингредиентов */}
      <CheckboxFiltersGroup
        className="mt-5"
        title="Ингридиенты"
        name="ingredients"
        limit={limit}
        defaultItems={items.slice(0, limit)}
        items={items}
        loading={loading}
        onClickCheckbox={onAddId}
        selected={selectedIds}
      />
    </div>
  );
};
