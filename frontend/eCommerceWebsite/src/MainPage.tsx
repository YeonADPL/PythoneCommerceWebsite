import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import SearchInventoryComponent from './SearchInventoryComponent';
import InventoryCard from './InventoryCard';
import { InventoryInterface } from './typeDefinition';

const MainPage = () => {
  const {hotSalesInventoryList,inventoryCategory} = useLoaderData() ;

  return (
      <div className='flex flex-col justify-center items-center w-screen gap-[10px]'>
        <div>
          <SearchInventoryComponent categoryList={inventoryCategory}/>
        </div>
        <div>
          {hotSalesInventoryList.map((product:InventoryInterface) => {
            return <InventoryCard id={product.id} title={product.title} name={product.name} price={product.price} imageUrl={product.imageUrl} rating={product.rating}  category={product.category} stockQuantity={product.stockQuantity}/>
            }
          )}
        
        </div>
      </div>
  );
} ;

export default MainPage;