import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CartPage.css';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You need to login first');
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Error fetching cart items');
        toast.error('Error fetching cart items');
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = async (itemId, change) => {
    const item = cartItems.find(item => item.id === itemId);
    const newQuantity = item.quantity + change;

    if (newQuantity < 1) return; // Prevent setting quantity below 1

    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`http://localhost:5000/api/cart/${itemId}`, 
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setCartItems(cartItems.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        ));
        toast.success('Quantity updated');
      } else {
        toast.error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Error updating quantity');
    }
  };

  const removeFromCart = async (itemId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setCartItems(cartItems.filter((item) => item.id !== itemId));
        toast.success('Item removed from cart');
      } else {
        toast.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Error removing item from cart');
    }
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You need to login first');
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="cart-container">
      <h1>My Cart</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="cart-items-row">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item-row">
              <img
                src="https://via.placeholder.com/150"
                alt={item.name}
                className="item-image"
              />
              <div className="item-details">
                <h2 className="item-name">{item.name}</h2>
                <p className="item-description">{item.description}</p>
                <p className="item-category">Category: {item.category}</p>
                <p className="item-price">Price: ₹{item.price.toFixed(2)}</p>
                <p className="item-dprice">Discount Price: ₹{item.dprice}</p>
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="quantity-button"
                  >
                    -
                  </button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="quantity-button"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No items in the cart</p>
        )}
      </div>
      {cartItems.length > 0 && (
        <button onClick={handleCheckout} className="checkout-button">
          Continue to Checkout
        </button>
      )}
      <ToastContainer />
    </div>
  );
}

export default CartPage;
