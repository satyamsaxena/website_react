import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Componets/Home';
import About from './Componets/About';
import Courses from './Componets/Courses';
import ProductDetail from './Componets/ProductDetail';
import Contact from './Componets/Contact';
import Login from './Componets/Login/Login';
import LandingPage from './LandingPage';
import DashboardHome from './DashboardHome';
import CreateItem from './CreateItem';
import EditItem from './EditItem';
import ViewItem from './ViewItem';
import CartPage from './CartPage';


import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/landing">Products</Link>
          </li>
            <li>
              <Link to="/login">Users</Link>
          </li>
         
         
          </ul>
          
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          {/* dashboared */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/cart" component={CartPage} />
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/create" element={<CreateItem />} />
          <Route path="/dashboard/edit/:id" element={<EditItem />} />
          <Route path="/dashboard/view/:id" element={<ViewItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
