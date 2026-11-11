import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import CheckProject from './pages/CheckProject';
import Berandaku from './pages/Berandaku';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import { INITIAL_ORDERS } from './data/mockData';

// ── Inner component that can use useLocation ──────────────────────────────────
function AppRoutes({ orders, setOrders, currentUser, setCurrentUser }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleLogin = (user) => setCurrentUser(user);
  const handleLogout = () => setCurrentUser(null);
  const handleUpdateOrders = (updatedList) => setOrders(updatedList);

  // ── ADMIN LAYOUT: Completely separate from public site ──────────────────────
  if (isAdminRoute) {
    return (
      <AdminLayout currentUser={currentUser} onLogout={handleLogout}>
        <Routes>
          <Route
            path="/admin"
            element={
              currentUser?.role === 'admin' ? (
                <AdminDashboard orders={orders} onUpdateOrders={handleUpdateOrders} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AdminLayout>
    );
  }

  // ── PUBLIC LAYOUT: Navbar + Footer + BottomNav ──────────────────────────────
  return (
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
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
      <BottomNav currentUser={currentUser} />
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('warunk_orders_v3');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('warunk_orders_v3', JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('warunk_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('warunk_orders_v3', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('warunk_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('warunk_user');
    }
  }, [currentUser]);

  return (
    <Router>
      <AppRoutes
        orders={orders}
        setOrders={setOrders}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </Router>
  );
}
