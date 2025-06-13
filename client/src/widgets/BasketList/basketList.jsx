import React from "react";
import BasketCard from "../BasketCard/BasketCard";
import { useState, useEffect } from "react";
import { BasketApi } from "../../entities/BasketApi";

export default function BasketList() {
  const [basket, setBasket] = useState([]);
  useEffect(() => {
    const getBasket = async () => {
      try {
        const { data } = await BasketApi.getAll();
        console.log(data);
        setBasket(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBasket();
  }, []);

  return (
    <>
      {basket.length ? (
        basket.map((el) => <BasketCard key={el.id} basket={el} />)
      ) : (
        <h1>Корзина пуста</h1>
      )}
    </>
  );
}
