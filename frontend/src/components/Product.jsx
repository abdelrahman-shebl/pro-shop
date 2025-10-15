import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden'>
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className='w-full h-56 object-cover'
        />
      </Link>
      <div className='p-4'>
        <Link to={`/product/${product._id}`}>
        <h3 className='font-semibold text-lg mb-2 text-gray-900 dark:text-black hover:text-indigo-600 transition line-clamp-2 h-14'>
          {product.name}
        </h3>
        </Link>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        <div className='text-xl font-bold mt-2 text-indigo-600 dark:text-indigo-400'>
          ${product.price}
        </div>
      </div>
    </div>
  );
};

export default Product;