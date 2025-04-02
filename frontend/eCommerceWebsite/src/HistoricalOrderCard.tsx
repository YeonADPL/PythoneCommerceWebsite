import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useContext,useState } from 'react';
import { AuthenticationContext } from './App';
import axios from 'axios';

const OrderCard = ({orderId,inventoryId,title, name, rating, price,imageUrl,category,orderQuantity,buyer,seller,status,orderDate,role}:{
        orderId:number,
        title:string,
        inventoryId:number,
        name:string,
        price:number,
        imageUrl:string,
        rating:number,
        category:string
        buyer:string,
        seller:string,
        status:string,
        orderDate:string,
        orderQuantity:number,
        role:string | null
    }) => {


    //["Pending Seller's Confirmation","Cancelled by Buyer","Cancelled by Seller","Confirmed by Seller","Shipped","Delivered by Seller","Received by Buyer"]
    
    return (
      <div key={inventoryId}className='flex flex-col justify-center items-center border-3 p-[10px] rounded-sm m-[10px] w-[90%]'>
            <div className='border-none rounded-sm overflow-hidden'><img src={`/${imageUrl}.jpg`} width={300} height={300} alt={category}/></div>
            <div><NavLink to={`/inventoryDetail/${inventoryId}`}>{title}</NavLink></div>
            <div>{name}</div>
            <div><span>Category : </span>{category}</div>
            <div><span>Rating : </span>{rating}</div>
            <div><span>$ </span>{price}</div>
            <div><span>Order Quantity : </span>{orderQuantity}</div>
            <div><span>Order Date : </span>{orderDate}</div>
            { role === "Seller" && <div><span>Buyer : </span>{buyer}</div> }
            <div><span>Seller : </span>{seller}</div>
            <span>Status : </span><span className='text-xl mr-[10px] font-bold'>{status}</span>
      </div>
    )

}

export default OrderCard