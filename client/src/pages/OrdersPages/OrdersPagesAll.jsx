import React from 'react'
import { OrdersApi } from '../../entities/OrdersApi'
import { useState, useEffect } from 'react';



export default function OrdersPagesAll() {



    const [orders, setOrders] = useState([])
    useEffect(() => {
        const getOrders = async () => {
        try {
            const { data } = await OrdersApi.getAll()
            setOrders(data)
        } catch (error) {
            console.log(error)
        }
        }
        getOrders()
    }, [])

    console.log(orders);
    
    
return (
    <div>1234
    {orders.map((el) =>
        <div key={el.id} element={element}>
        <hr />
        <h3>{el.order_name}</h3>
            <h4>{el.img_path}</h4> 
        <button>Подробнее</button>    
        <hr />
        </div> 
        
    )}
    
    </div>
)
}
