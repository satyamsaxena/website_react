import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
import './Dashboard.css';

function CreateItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [dprice, setdPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/items', { name, description, price, dprice, quantity });
      toast.success('Item created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating item:', error);
      toast.error('Error creating item. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <ToastContainer />
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
            Discount Price:
            <input type="number" value={dprice} onChange={(e) => setdPrice(e.target.value)} required />
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
