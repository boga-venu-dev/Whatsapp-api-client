import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const response = await getDashboardStats();
      setStats(response.data);
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Messages Sent: {stats.messagesSent}</p>
      <p>Recent Orders: {stats.recentOrders}</p>
      <p>Abandoned Carts: {stats.abandonedCarts}</p>
    </div>
  );
};

export default Dashboard;