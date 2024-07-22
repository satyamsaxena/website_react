import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LandingPage.css';

function LandingPage() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data.');
      }
    };

    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchUserData();
    fetchItems();
  }, []);

  const addToCart = async (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to login first');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/cart', 
        { itemId, quantity: 1 }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Error adding item to cart');
    }
  };

  return (
    <div className="landing-container">
      <h1>DB Products Page</h1>
      {user ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <p>{error || 'Loading user data...'}</p>
      )}
      <div className="items-grid">
        {items.map(item => (
          <div key={item.id} className="item-card">
            <img 
              src="https://via.placeholder.com/150" 
              alt={item.name} 
              className="item-image" 
            />
            <h2 className="item-name"><b>Title:</b> {item.name}</h2>
            <p className="item-description"><b>Description:</b> {item.description}</p>
            <p className="item-category"><b>Category:</b> {item.category}</p>
            <p className="item-stock"><b>Stock:</b> {item.quantity}</p>
            <p className="item-price"><b>Price:</b> ₹{item.price.toFixed(2)}</p>
            <p className="item-dprice"><b>Discount Price:</b> ₹{item.dprice}</p>
            <button onClick={() => addToCart(item.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
