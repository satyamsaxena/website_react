import React, { useEffect, useState } from 'react'; // Add useEffect here
import axios from 'axios'; // Ensure axios is imported
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        toast.error('Error fetching products.');
      }
    };

    fetchProducts();
  }, []);

  const handleIncrement = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDecrement = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const handleProceedToCheckout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warning('You need to login first.');
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1>Product List</h1>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => handleDecrement(product.id)}>-</button>
            <span>{cart[product.id] || 0}</span>
            <button onClick={() => handleIncrement(product.id)}>+</button>
          </div>
        ))}
      </div>
      <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
    </div>
  );
}

export default ProductList;
