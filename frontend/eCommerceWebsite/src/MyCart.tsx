import {useState, useEffect, useContext} from 'react';
import { AuthenticationContext } from './App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosWithCredentials,{requestInterceptor, responseInterceptor} from './axiosWithCredentials';
import { CartInterface,InventoryInterface } from './typeDefinition';
import AddToCartCard from './AddToCartCard';


const MyCart = () => {

    const { userInfo } = useContext(AuthenticationContext);
    const navigate = useNavigate();
    const [addToCartList, setAddToCartList] = useState<CartInterface[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {

        const controller = new AbortController();
        async function fetchMyCart() {
            try {
                const getMyCartResponse = await axiosWithCredentials.get(`http://localhost:8000/api/myCart?id=${userInfo.userId}`, { 
                    signal: controller.signal 
                });

                if ( getMyCartResponse.status === 200) {
                    console.log("My Cart Response is ", getMyCartResponse.data);
                    const inventoryList = getMyCartResponse.data.map((i: {inventory:InventoryInterface[],quantity:number}) => {
                        return {
                            id: i.inventory[0].id,
                            title:i.inventory[0].title, 
                            name: i.inventory[0].name, 
                            price:i.inventory[0].price,
                            imageUrl:i.inventory[0].imageUrl, 
                            rating:i.inventory[0].rating,
                            category:i.inventory[0].category,
                            quantity:i.quantity
                        }
                    });
                    console.log("Inventory List is ", inventoryList);
                    setAddToCartList(inventoryList);
                }
                    
            }
            catch(error) {
                if(axios.isAxiosError(error)) {
                    console.log("Error response is ", error.response);
                }
                else {
                    console.log("Error is ", error);
                }
            }
        }
        fetchMyCart();

        return () => {
            controller.abort(); // Request will cancel and abort when unmounts
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }
    }, []);

    useEffect(() => {
        
        setTotalPrice(addToCartList.reduce((acc, product) => acc + product.price*product.quantity
        , 0));
    }, [addToCartList]);

    useEffect(() => {
        if (userInfo.isAuthenticated === false) {
            navigate('/login');
        }
    }, [userInfo.isAuthenticated]);

    const makeOrder = async () => {
        // Make Order
        
    }

  return (
    <div className='relative flex flex-col justify-center items-center'>
        <div>MyCart</div>
        <div>
          {addToCartList.map((product:CartInterface) => {
            return <AddToCartCard key={Number(product.id)} id={product.id} title={product.title} name={product.name} price={product.price} imageUrl={product.imageUrl} rating={product.rating}  category={product.category} quantity={product.quantity} cartList={addToCartList} setCartList={setAddToCartList}/>
            }
          )}
        
        </div>
        <div className='fixed bottom-0 h-[100px] w-full bg-cyan-300 border-5 rounded-sm flex justify-around items-center'>
            <div><span className='text-5xl'>Total Price : $</span></div> 
            <div>
                <span className='text-6xl font-bold'>{totalPrice}</span>
            </div>
            <button onClick={makeOrder}>Make Order</button>
        </div>
    </div>
  )
}

export default MyCart