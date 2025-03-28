import { Link } from 'react-router-dom';
import { useState } from 'react';

interface NavbarProps {
  cartCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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
      <div>
        <button>Login</button>
        <button>Sign Up</button>
        <button>Cart</button>
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >Open</button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[64px] left-0 right-0 p-[16px] shadow-lg shadow-grey-300 md:hidden">
            <button>
              Login
            </button>
            <button>
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