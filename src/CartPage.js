import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CartPage.css';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to login first');
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
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (itemId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Error removing item from cart');
    }
  };

  return (
    <div className="cart-container">
      <h1>My Cart</h1>
      {error && <p>{error}</p>}
      <div className="cart-items-grid">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item-card">
              <img
                src="https://via.placeholder.com/150"
                alt={item.name}
                className="item-image"
              />
              <h2 className="item-name">{item.name}</h2>
              <p className="item-description">{item.description}</p>
              <p className="item-category">Category: {item.category}</p>
              <p className="item-stock">Stock: {item.quantity}</p>
              <p className="item-price">Price: ₹{item.price.toFixed(2)}</p>
              <p className="item-dprice">Discount Price: ₹{item.dprice}</p>
              <p className="item-quantity">Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No items in the cart</p>
        )}
      </div>
    </div>
  );
}

export default CartPage;
