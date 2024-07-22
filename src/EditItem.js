import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from './Sidebar';

function EditItem() {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/items/${id}`)
      .then(response => {
        setItem(response.data);
      })
      .catch(error => {
        console.error('Error fetching item:', error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:5000/api/items/${id}`, item)
      .then(() => {
        navigate('/dashboard');
      })
      .catch(error => {
        console.error('Error updating item:', error);
      });
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-form">
        <h1>Edit Item</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} required />
          </label>
          <label>
            Description:
            <textarea value={item.description} onChange={(e) => setItem({ ...item, description: e.target.value })} />
          </label>
          <label>
            Price:
            <input type="number" value={item.price} onChange={(e) => setItem({ ...item, price: e.target.value })} required />
          </label>
          <label>
            Quantity:
            <input type="number" value={item.quantity} onChange={(e) => setItem({ ...item, quantity: e.target.value })} required />
          </label>
          <button type="submit">Update Item</button>
        </form>
      </div>
    </div>
  );
}

export default EditItem;
