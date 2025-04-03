import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import MainPage from './MainPage';
import InventoryDetail from './InventoryDetail';
import Login from './Login';
import SignUp from './Signup';
import UserPage from './UserPage';
import hotSalesInventoryLoader from './hotSalesInventoryLoader';
import InventorySearchPage from './InventorySearchPage';
import { useState , createContext, SetStateAction} from 'react';
import MyCart from './MyCart';
import MyOrder from './MyOrder';
import HistoricalOrders from './HistoricalOrders';
import fetchInventoryCategory from './fetchInventoryCategory';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    loader: fetchInventoryCategory,
    children: [
      {
        index: true,
        element: <MainPage />,
        loader : hotSalesInventoryLoader,
      },
      {
        path: '/inventoryDetail/:id',
        element: <InventoryDetail />,
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
      {
        path: '/myorder',
        element: <MyOrder />,
      },
      {
        path: '/historicalOrders',
        element: <HistoricalOrders />,
      },
    ],
  },
]);
// export const AuthenticationContext = createContext<{isAuthenticated: boolean, setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>}>({
//   isAuthenticated: false,
//   setIsAuthenticated: () => {},
// });
export const AuthenticationContext = createContext<{userInfo: {userId: null, role:null, isAuthenticated: boolean}, setUserInfo: React.Dispatch<SetStateAction<{userId: null, role:null,  isAuthenticated: boolean}>>}>({
  userInfo:{userId: null, role:null, isAuthenticated: false} ,
  setUserInfo: () => {},
});

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({userId: null, role:null, isAuthenticated: false});
  return <AuthenticationContext.Provider value={{userInfo, setUserInfo}}>
            <RouterProvider router={router} />
        </AuthenticationContext.Provider>;
}

export default App;