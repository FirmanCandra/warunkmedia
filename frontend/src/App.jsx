import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import CheckProject from './pages/CheckProject';
import Berandaku from './pages/Berandaku';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import { INITIAL_ORDERS } from './data/mockData';

export default function App() {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('warunk_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('warunk_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('warunk_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('warunk_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('warunk_user');
    }
  }, [currentUser]);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleUpdateOrders = (updatedList) => {
    setOrders(updatedList);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-canvas text-ink">
        <Navbar currentUser={currentUser} onLogout={handleLogout} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cek-projek" element={<CheckProject orders={orders} />} />
            <Route
              path="/berandaku"
              element={<Berandaku orders={orders} currentUser={currentUser} />}
            />
            <Route
              path="/admin"
              element={
                <AdminDashboard
                  orders={orders}
                  onUpdateOrders={handleUpdateOrders}
                />
              }
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        <BottomNav currentUser={currentUser} />
      </div>
    </Router>
  );
}
