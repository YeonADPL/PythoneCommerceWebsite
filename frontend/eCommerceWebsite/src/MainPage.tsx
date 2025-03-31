import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Product } from './typeDefinition';
import SearchInventoryComponent from './SearchInventoryComponent';
import InventoryCard from './InventoryCard';

const MainPage = () => {
  const {hotSalesInventoryList,inventoryCategory} = useLoaderData() ;

  return (
      <div className='flex flex-col justify-center items-center w-screen gap-[10px]'>
        <div>
          <SearchInventoryComponent categoryList={inventoryCategory}/>
        </div>
        <div>
          {hotSalesInventoryList.map((product:{id:number,title:string, name: string, price:number,imageUrl:string, rating:number}) => {
            return <InventoryCard id={product.id} title={product.title} name={product.name} price={product.price} imageUrl={product.imageUrl} rating={product.rating} />
            }
          )}
        
        </div>
      </div>
  );
} ;

export default MainPage;