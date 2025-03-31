import { Link, useNavigate  } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthenticationContext } from './App';
import axios from 'axios';

interface NavbarProps {
  cartCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthenticationContext);

  return (
    <nav style={{
      padding: '0 24px',
      height: '64px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff'
    }}>
      <div>
        <Link to="/">
          <p style={{ margin: 0 }}>
            E-Commerce
          </p>
        </Link>
      </div>
      <div> {
        !isAuthenticated ? (
        <>
        <button onClick={()=> navigate('/login')}>Login</button>
        <button onClick={()=> navigate('/signup')}>Sign Up</button>
        </>) : (
          <>
            <button>Cart</button>
            <button onClick={async ()=> {

              try{
                await axios.post('http://localhost:8000/dj-rest-auth/logout');
              }
              catch(error) {
                if (axios.isAxiosError(error)) {
                console.log("Error response is ", error.response);
                }
                console.log("Error is ", error);
              }
              finally {
                setIsAuthenticated(false);
                navigate('/login');
              }
            }}>Logout</button>
          </>
        )
        
        }
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >Open</button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[64px] left-0 right-0 p-[16px] shadow-lg shadow-grey-300 md:hidden">
            <button onClick={()=> navigate('/login')}>
              Login
            </button>
            <button onClick={()=> navigate('/signup')}>
              Sign Up
            </button>
              <button>
                Cart {cartCount}
              </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;