import React from "react";

export default function BasketCard({ basket }) {

  const backgroundImageUrl = 'https://avatars.mds.yandex.net/get-altay/7730813/2a000001842222d02dadfc542442ff57ac78/XXL_height';

  return (
    <>
      <div
      style={{
        minHeight: '100vh',               // высота 100% экрана
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',          // масштабирование
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',                  // для центрирования контента
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textShadow: '0 0 8px rgba(0,0,0,0.8)',  // тень для читаемости текста
        padding: '20px',
      }}
      >
        <img
          src={`${basket.Order.img_path}`}
          width="650px"
          height="650px"
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
