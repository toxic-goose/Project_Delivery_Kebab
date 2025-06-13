import React from 'react';
import BasketList from '../../widgets/BasketList/basketList';
import './BasketPage.css';

export default function BasketPage() {
  return (
    <div className="basket-page">
      <h1 className="basket-title">Корзина</h1>
      <BasketList />
    </div>
  );
}