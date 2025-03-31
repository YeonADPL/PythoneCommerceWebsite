import { NavLink } from 'react-router-dom'

const InventoryCard = ({id,title, name, rating, price,imageUrl}:{id:number,title:string, name: string, price:number,imageUrl:string, rating:number}) => {
  return (
    <div className='border-2 p-[10px] rounded-sm m-[10px]'>
        <div><img src={`/${imageUrl}`} width={300} height={300} /></div>
        <div><NavLink to={`/inventoryDetail/${id}`}>{title}</NavLink></div>
        <div>{name}</div>
        <div><span>Rating : </span>{rating}</div>
        <div><span>$ </span>{price}</div>
    </div>
  )
}

export default InventoryCard