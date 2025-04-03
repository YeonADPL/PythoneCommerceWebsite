import { NavLink} from 'react-router-dom';
import { useState } from 'react';
import { CartInterface } from './typeDefinition';
import clsx from 'clsx';


const AddToCartCard = ({id,title, name, rating, price,imageUrl,category,quantity,colorList, currentSelectedColor,cartList, setCartList}:{
    id:number,
    title:string, 
    name: string, 
    price:number,
    imageUrl:string, 
    rating:number,
    category:string,
    quantity:number,
    colorList:string[],
    currentSelectedColor:string,
    cartList:CartInterface[],
    setCartList:React.Dispatch<React.SetStateAction<CartInterface[]>>
}) => {

    const [ selectedColor, setSelectedColor] = useState<string>(currentSelectedColor);

    const removeAction =  () => {
        setCartList(cartList.filter((item) => item.id !== id));
    }

    const increaseQuantity =  () => {
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

    const decreaseQuantity =  () => {
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

    const updatedSelectedColor = (color:string) => {
        setCartList(cartList.map((item) => {
            if (item.id === id) {
                return {
                ...item,
                selectedColor: color
                }
            }
            else {
                return item
            }
            }));
    };

  return (
    <div key={id} className='flex flex-col justify-center items-center border-2 p-[10px] rounded-sm m-[10px]'>
        <div className='border-none rounded-sm overflow-hidden'><img src={`/${imageUrl}.jpg`} width={300} height={300} /></div>
        <div className='text-2xl font-bold'><NavLink to={`/inventoryDetail/${id}`}>{title}</NavLink></div>
        <div>{name}</div>
        <div><span>Category : </span>{category}</div>
        <div>
            <span>Color : </span>{colorList.map(c=> 
            <button key={c} className={clsx(selectedColor === c ? "text-red-500" : "text-black")} 
                // onClick={()=> setSelectedColor(color)}>{color}
                onClick={()=> {updatedSelectedColor(c); setSelectedColor(c);}}>{c}
            </button>)}
        </div>
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