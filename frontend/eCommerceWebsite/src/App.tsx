import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import MainPage from './MainPage';
import ProductDetail from './ProductDetail';
import Login from './Login';
import SignUp from './Signup';
import UserPage from './UserPage';
import hotSalesInventoryLoader from './hotSalesInventoryLoader';
import InventorySearchPage from './InventorySearchPage';
import { useState , createContext, SetStateAction} from 'react';
import MyCart from './MyCart';




const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
        loader : hotSalesInventoryLoader,
      },
      {
        path: '/inventoryDetail/:id',
        element: <ProductDetail />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/userpage',
        element: <UserPage />,
      },
      {
        path: '/inventorysearchpage',
        element: <InventorySearchPage />,
      },
      {
        path: '/mycart',
        element: <MyCart />,
      },
    ],
  },
]);
// export const AuthenticationContext = createContext<{isAuthenticated: boolean, setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>}>({
//   isAuthenticated: false,
//   setIsAuthenticated: () => {},
// });
export const AuthenticationContext = createContext<{userInfo: {userId: null, isAuthenticated: boolean}, setUserInfo: React.Dispatch<SetStateAction<{userId: null, isAuthenticated: boolean}>>}>({
  userInfo:{userId: null, isAuthenticated: false} ,
  setUserInfo: () => {},
});

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({userId: null, isAuthenticated: false});
  return <AuthenticationContext.Provider value={{userInfo, setUserInfo}}>
            <RouterProvider router={router} />
        </AuthenticationContext.Provider>;
}

export default App;