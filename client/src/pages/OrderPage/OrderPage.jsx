import React from 'react'
import { useState } from 'react';
import './OrderPage.css'

export default function OrderPage() {
    const INITIAL_INPUTS_DATA = {
        order_name: "",
        img_path: "",
        description: "",
        price: "",
        sale: ""
    };
    const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);

    const onChangeHandler = (event) => {
        setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const { order_name, img_path, description, price, sale } = inputs;

    return (
    <>
    <form className='orderPage'>
        <input
            type="text"
            name="order_name"
            placeholder="Введите название заказа:"
            autoFocus
            onChange={onChangeHandler}
            value={order_name}
        />

        <input
            type="text"
            name="img_path"
            placeholder="Drag-n-drop"
            onChange={onChangeHandler}
            value={img_path}
        />

        <input
            type="text"
            name="description"
            placeholder="Введите описание:"
            onChange={onChangeHandler}
            value={description}
        />

        <input
            type="number"
            name="price"
            placeholder="Введите цену:"
            onChange={onChangeHandler}
            value={price}
        />

        <input
            type="number"
            name="sale"
            placeholder="Введите цену по скидке:"
            onChange={onChangeHandler}
            value={sale}
        />

        <button className='button' type="submit">Создать</button>
    </form>
    </>
    )
}
