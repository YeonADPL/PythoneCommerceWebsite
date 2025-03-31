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
    ],
  },
]);
export const AuthenticationContext = createContext<{isAuthenticated: boolean, setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return <AuthenticationContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            <RouterProvider router={router} />
        </AuthenticationContext.Provider>;
}

export default App;