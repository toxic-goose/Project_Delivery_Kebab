import React from "react";

export default function BasketCard({ basket }) {
  return (
    <>
      <div>{basket.order_name}</div>

      <div>Удалить</div>
    </>
  );
}
