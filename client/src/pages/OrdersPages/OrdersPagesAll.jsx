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
    
    // const SubmitHandler = async () => { 
    //     const data = await OrdersApi.getAll()
    //     console.log(data);
        
    // return data    
    // }
    


// const data = await OrdersApi.getAll
return (
    <div>1234
    
    {orders.map((el) =>
        <div key={el.id}>
        <hr />
        <h3>{el.order_name}</h3>
        <h4>{el.description}</h4>
        <h4>{el.description}</h4>
        <h4>{el.price}</h4>
        <hr />
        </div> 
        // <UserCard orders={orders}  el={el} key={el.id} />
    )}
    
    </div>
)
}
