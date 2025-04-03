import { useLoaderData } from 'react-router-dom';
import InventoryCard from './InventoryCard';
import { InventoryInterface } from './typeDefinition';

const MainPage = () => {
  const {hotSalesInventoryList} = useLoaderData() ;

  return (
      <div className='flex flex-col justify-center items-center w-screen gap-[10px]'>
        <div className='mt-[20px]'><span className='text-5xl font-bold'>Top 5 🔥 Hot Sales Inventory : </span></div>
        <div className='flex justify-center items-center'>
          {hotSalesInventoryList.map((product:InventoryInterface) => {
            return <InventoryCard key={product.id} id={product.id} title={product.title} name={product.name} price={product.price} imageUrl={product.imageUrl} rating={product.rating}  category={product.category} stockQuantity={product.stockQuantity} color={product.color} / >
            }
          )}
        
        </div>
      </div>
  );
} ;

export default MainPage;