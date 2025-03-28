import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import Login from './Login';
import SignUp from './Signup';
import { productsLoader, productDetailLoader } from './loader';
import { loginAction, signupAction } from './action';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ProductList />,
        loader: productsLoader,
      },
      {
        path: 'product/:id',
        element: <ProductDetail />,
        loader: productDetailLoader,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'signup',
        element: <SignUp />,
        action: signupAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;