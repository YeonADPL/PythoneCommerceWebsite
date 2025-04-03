import { Outlet, useLoaderData } from 'react-router-dom';
import Navbar from './Navbar';

const RootLayout: React.FC = () => {

  const inventoryCategory = useLoaderData() ;

  return (
    <div className='w-screen h-screen'>
      <div style={{ 
        width: '100%', 
        backgroundColor: '#fff',
        padding: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Navbar categoryList = {inventoryCategory}/>
      </div>
      
      <div>
        <Outlet />
      </div>
      
    </div>
  );
};

export default RootLayout;