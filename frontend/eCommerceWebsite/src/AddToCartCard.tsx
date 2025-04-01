import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthenticationContext } from './App';
import axios from 'axios';
import { CartInterface } from './typeDefinition';


const AddToCartCard = ({id,title, name, rating, price,imageUrl,category,quantity,cartList, setCartList}:{
    id:number,
    title:string, 
    name: string, 
    price:number,
    imageUrl:string, 
    rating:number,
    category:string,
    quantity:number,
    cartList:CartInterface[],
    setCartList:React.Dispatch<React.SetStateAction<CartInterface[]>>
}) => {

  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useContext(AuthenticationContext);


  const removeAction = async () => {
    
  }

  const increaseQuantity = async () => {
    setCartList(cartList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      else {
        return item
      }
    }));
  }

  const decreaseQuantity = async () => {
    setCartList(cartList
      .map((item) => {
        if (item.id === id) {
            if (item.quantity === 1) {
                return null;
            } 
            else {
                return {
                ...item,
                quantity: item.quantity - 1,
                };
            }
        } 
        else {
            return item;
        }
      })
      .filter((item): item is CartInterface => item !== null));
  }
  return (
    <div key={id} className='border-2 p-[10px] rounded-sm m-[10px]'>
        <div><img src={`/${imageUrl}`} width={300} height={300} /></div>
        <div><NavLink to={`/inventoryDetail/${id}`}>{title}</NavLink></div>
        <div>{name}</div>
        <div><span>Category : </span>{category}</div>
        <div><span>Rating : </span>{rating}</div>
        <div><span>$ </span>{price}</div>
        <div>
            <span>Quantity : </span><span>{quantity}</span>
            <button onClick={increaseQuantity}><span className='text-3xl font-bold border-3 border-brown-500 w-11 h-11 shrink-0 grow-0 rounded-full'> + </span></button>
            <button onClick={decreaseQuantity}><span className='text-3xl font-bold border-3 border-brown-500 aspect-square rounded-full'> - </span></button>
        </div>
        <div><button onClick={removeAction} className='bg-red-500 p-[5px] border-2 border-red-500 rounded-sm text-3xl font-bold'>Remove</button></div>
    </div>
  )
}

export default AddToCartCard