import React, { useEffect } from 'react'
import './OrderPage.css'
import { useParams } from 'react-router';
import OrderForm from '../../features/auth/ui/OrderForm/OrderForm';
import OrderCard from '../../features/auth/ui/OrderCard/OrderCard';


export default function OrderPage({ user }) {
    const { orderId } = useParams()

    return (

    <> 
    {user.is_buyer ? (
        <OrderCard orderId={orderId} />
    ) : (
        <OrderForm />
    )}
    </>
    )
}
