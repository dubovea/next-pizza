import * as React from "react";

interface OrderPayTemplateProps {
  orderNumber: number;
  totalAmount: number;
  paymentUrl: string;
}

export const OrderPayTemplate: React.FC<Readonly<OrderPayTemplateProps>> = ({
  orderNumber,
  totalAmount,
  paymentUrl,
}) => (
  <div>
    <h1>Заказ {orderNumber}</h1>

    <p>
      Оплатите заказ на сумму {totalAmount} ₽. Перейдите
      <a href={paymentUrl}> по ссылке для оплаты</a>
      заказа.
    </p>
  </div>
);
