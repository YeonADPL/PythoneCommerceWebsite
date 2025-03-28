import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Product } from './typeDefinition';

interface LoaderData {
  products: Product[];
}

const ProductList = () => {
  const { products } = useLoaderData() as LoaderData;
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div style={{ padding: '24px' }}>
      <div style={{ width: '100%' }}>
        <div>
          Find Your Perfect Product
        </div>
        <input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: '600px' }}
        />
        <div>
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div  style={{ marginTop: '16px' }}>
                <div>
                  ${product.price}
                </div>
                <div>
                  <button>View Details</button>
                  <button>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        
      </div>
      </div>
      </div>
  );
} ;

export default ProductList;