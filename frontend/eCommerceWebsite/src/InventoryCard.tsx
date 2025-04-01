import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthenticationContext } from './App';
import axios from 'axios';
import { InventoryInterface } from './typeDefinition';


const InventoryCard = ({id,title, name, rating, price,imageUrl,category,stockQuantity}:InventoryInterface) => {

  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useContext(AuthenticationContext);


  const addToCart = async () => {
    console.log("Inside addToCart Action");
    if (userInfo.isAuthenticated === false) {
      navigate('/login',{state:{from:location.pathname}});
    }
    else {
      console.log("Add to Cart Clicked for ", title);
      try {
        const addToCartAction = await axios.post('http://localhost:8000/api/addToCart', {
          user: userInfo.userId,
          inventory: id,
          quantity: 1
        });
  
        console.log("Add to Cart Response is ", addToCartAction.data);
      }
      catch(error) {
        if (axios.isAxiosError(error)) {
          console.log("Error response is ", error.response);
        } 
        else {
          console.log("Error is ", error);
        }
      } 
    }

  }
  return (
    <div key={id}className='border-2 p-[10px] rounded-sm m-[10px]'>
        <div><img src={`/${imageUrl}`} width={300} height={300} /></div>
        <div><NavLink to={`/inventoryDetail/${id}`}>{title}</NavLink></div>
        <div>{name}</div>
        <div><span>Category : </span>{category}</div>
        <div><span>Rating : </span>{rating}</div>
        <div><span>$ </span>{price}</div>
        <div><button onClick={addToCart}>Add to Cart</button></div>
    </div>
  )
}

export default InventoryCard