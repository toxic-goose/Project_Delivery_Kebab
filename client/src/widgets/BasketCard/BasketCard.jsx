import React from "react";
import './BasketCard.css';

export default function BasketCard({ basket }) {

  const backgroundImageUrl = 'https://avatars.mds.yandex.net/get-altay/7730813/2a000001842222d02dadfc542442ff57ac78/XXL_height';

  return (
    <div className="basket-card">
      <img
        src={`${basket.Order.img_path}`}
        alt={basket.Order.order_name}
      />
      <div className="basket-card-details">
        <h1>{basket.Order.order_name}</h1>
        <div className="basket-card-price">{basket.Order.sale} рублей</div>

      </div>
      <div className="basket-card-actions">
        <button>Удалить</button>
      </div>
      <hr />
    </div>
  );
}