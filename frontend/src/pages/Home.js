import React from 'react';
import Dashboard from '../components/Dashboard';
import '../styles/Home.css';

const Home = () => (
  <div className="home-container">
    <h1 className="home-title">Welcome to WhatsApp API Client</h1>
    <div className="home-dashboard">
      <Dashboard />
    </div>
  </div>
);

export default Home;