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