import React from "react";

export default function BasketCard({ basket }) {
  return (
    <>
      <div>
        <img
          src={`${basket.Order.img_path}`}
          width="250px"
          height="250px"
          alt="Заказы"
        />
      </div>
      <div>
        <h1>{`${basket.Order.order_name}`}</h1>
      </div>
      <div>{`${basket.Order.sale} рублей`}</div>
      <div>
        <button>Удалить</button>
      </div>
      <hr />
    </>
  );
}
