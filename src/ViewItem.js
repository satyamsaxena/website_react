import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from './Sidebar';

function ViewItem() {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/items/${id}`)
      .then(response => {
        setItem(response.data);
      })
      .catch(error => {
        console.error('Error fetching item:', error);
      });
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-item-details">
        <h1>View Item</h1>
        <p><strong>Name:</strong> {item.name}</p>
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Price:</strong> ${item.price}</p>
        <p><strong>Quantity:</strong> {item.quantity}</p>
      </div>
    </div>
  );
}

export default ViewItem;
