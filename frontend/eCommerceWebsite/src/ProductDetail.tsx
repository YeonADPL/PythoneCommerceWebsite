import { useLoaderData } from 'react-router-dom';
import { Product } from './typeDefinition';

interface LoaderData {
  product: Product;
}

const ProductDetail = () => {
  const { product } = useLoaderData() as LoaderData;

  return (
    // Component JSX remains the same
    <div style={{ padding: '24px' }}>
      <div>
        <div>
          <div>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div >
            <div>
              {product.name}
            </div>
            <div>
              ${product.price}
            </div>
            <div>
              {product.description}
            </div>
            <button>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;