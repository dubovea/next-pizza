"use server";

import { CheckoutFormValues } from "@/shared/contants";
import { prisma } from "@/prisma/prisma-client";
import { comment } from "postcss";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { createPayment, sendEmail } from "@/shared/lib";
import { OrderPayTemplate } from "@/shared/components/shared/email-templates/order-pay";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cart-token")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }
    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    /* Создаем заказ */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    /* Очищаем корзину */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({
      description: `Оплата заказа ${order.id}`,
      orderId: order.id,
      amount: order.totalAmount,
    });

    if (!paymentData) {
      throw new Error("Payment data not found");
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;
    
    await sendEmail(
      data.email,
      `Next Pizza / Оплатите заказ ${order.id}`,
      OrderPayTemplate({
        orderNumber: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: paymentUrl,
      })
    );

    return paymentUrl;
  } catch (err) {
    console.log("[Create Order] Server error", err);
  }
}
