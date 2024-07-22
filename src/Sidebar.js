import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <ul className="sidebar-menu">
        <li>
          <Link className="sidebar-link" to="/dashboard">Home</Link>
        </li>
        <li>
          <Link className="sidebar-link" to="/dashboard/create">Create Item</Link>
        </li>
        {/* <li>
          <Link className="sidebar-link" to="/dashboard/view">View Items</Link>
        </li>
        <li>
          <Link className="sidebar-link" to="/dashboard/edit">Edit Items</Link>
        </li> */}
      </ul>
    </div>
  );
}

export default Sidebar;
