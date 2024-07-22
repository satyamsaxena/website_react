import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Dashboard.css';

function DashboardHome() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <nav className="dashboard-nav">
        <Link className="dashboard-link" to="/dashboard/create">Create New Item</Link>
      </nav>
      <div className="dashboard-content">
        <h1 className="dashboard-title">Items List</h1>
        <ul className="dashboard-item-list">
          {items.map(item => (
            <li key={item.id} className="dashboard-item">
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </div>
              <div className="item-actions">
                <Link className="action-link" to={`/dashboard/view/${item.id}`}>View</Link>
                <Link className="action-link" to={`/dashboard/edit/${item.id}`}>Edit</Link>
                <button className="action-button" onClick={() => deleteItem(item.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function deleteItem(id) {
  axios.delete(`http://localhost:5000/api/items/${id}`)
    .then(() => {
      window.location.reload();
    })
    .catch(error => {
      console.error('Error deleting item:', error);
    });
}

export default DashboardHome;
