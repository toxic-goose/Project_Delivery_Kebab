import React, { useEffect } from 'react'
import { useState } from 'react';
import { OrdersApi } from '../../../../entities/OrdersApi';
import { NavLink } from 'react-router';

const INITIAL_INPUTS_DATA = {
    order_name: "",
    img_path: "",
    description: "",
    price: "",
    sale: ""
};

export default function OrderCard({orderId}) {
const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);
console.log(orderId);

useEffect(() => {
    const getOrder = async () =>{
        if(orderId){
            const data = await OrdersApi.getOne(orderId)
            console.log(data);
            setInputs(data.data)
        }
    }
    getOrder()  
}, [])

  const { order_name, img_path, description, price, sale } = inputs;
  return (
    <article className="order-card" role="region" aria-label={`Заказ ${order_name}`}>
      <h2 className="order-title">{order_name || "Без названия заказа"}</h2>
      {img_path ? (
        <img src={img_path} alt={`Изображение для заказа ${order_name}`} className="order-image" />
      ) : (
        <div className="order-image order-image--placeholder" aria-label="Изображение отсутствует" />
      )}
      <p className="order-description">
        {description || "Описание отсутствует"}
      </p>
      <div className="price-row">
        <span className="price">{price ? `${price} ₽` : "Цена не указана"}</span>
        {sale && sale !== price && (
          <span className="sale">{sale} ₽</span>
        )}
        <NavLink to={'/basket'}>  
          <button>Выкупить</button>
        </NavLink> 
      </div>
     
    </article>
  );
}
