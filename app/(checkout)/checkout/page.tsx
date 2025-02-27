"use client";

import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCart } from "@/shared/hooks";
import React, { useState } from "react";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/contants";
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutSidebar,
  Container,
  Title,
} from "@/shared/components";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);
  const {
    loading,
    initialLoading,
    totalAmount,
    updateItemQuantity,
    removeCartItem,
    items,
  } = useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);

      toast.success("Заказ успешно создан! Переход на оплату...", {
        icon: "🎉",
      });
      if (url) {
        location.href = url;
      }
    } catch (err) {
      setSubmitting(false);
      console.log(err);
      toast.error("Не удалось создать заказ", {
        icon: "🚫",
      });
    }
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                initialLoading={initialLoading}
              />
              <CheckoutPersonalForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />

              <CheckoutAddressForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>
            <div className="w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
