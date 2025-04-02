export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description?: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface SignUpData extends LoginCredentials {
    name: string;
    confirmPassword: string;
  }

  export interface InventoryInterface {
    id:number,
    title:string, 
    name: string, 
    price:number,
    imageUrl:string, 
    rating:number,
    category:string,
    stockQuantity:number
  }

  export interface CartInterface {
    id:number,
    title:string, 
    name: string, 
    price:number,
    imageUrl:string, 
    rating:number,
    category:string,
    quantity:number
  }
  export interface OrderInterface {
    orderId:number,
    inventory:{
      title:string,
      id:number,
      name:string,
      price:number,
      imageUrl:string,
      rating:number,
      category:string
      },
    buyer:string,
    seller:string,
    status:string,
    orderDate:string,
    quantity:number
  }