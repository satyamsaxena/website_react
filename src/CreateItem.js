import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Dashboard.css';

function CreateItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/items', { name, description, price, quantity })
      .then(() => {
        navigate('/dashboard');
      })
      .catch(error => {
        console.error('Error creating item:', error);
      });
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-form">
        <h1>Create New Item</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <label>
            Price:
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </label>
          <label>
            Quantity:
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
          </label>
          <button type="submit">Create Item</button>
        </form>
      </div>
    </div>
  );
}

export default CreateItem;
