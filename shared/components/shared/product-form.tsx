"use client";

import React from "react";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";
import { IProduct } from "@/@types/product";
import { useCartStore } from "@/shared/store";

interface Props {
  product: IProduct;
  handleSuccess?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({
  product,
  handleSuccess
}) => {
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const [loading, addCartItem] = useCartStore((state) => [
    state.loading,
    state.addCartItem,
  ]);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(product.name + " добавлена в корзину");

      handleSuccess?.();
    } catch (err) {
      toast.error("Не удалось добавить товар в корзину");
      console.error(err);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstItem.price}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};
