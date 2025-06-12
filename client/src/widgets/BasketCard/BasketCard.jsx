import React from "react";

export default function BasketCard({ basket }) {
  return (
    <>
      <div>{basket.Order.order_name}</div>
      <div>{basket.Order.price}</div>
      <div>{basket.Order.location}</div>
      <div>{basket.Order.description}</div>
      

      <div>Удалить</div>
    </>
  );
}
