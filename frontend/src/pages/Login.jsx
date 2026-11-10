import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, ShieldCheck } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // 'customer' or 'admin'
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'admin') {
      onLogin({
        id: 1,
        name: 'Owner Warunk Media',
        email: email || 'owner@warunkmedia.com',
        role: 'admin',
      });
      navigate('/admin');
    } else {
      onLogin({
        id: 2,
        name: 'Firman Candra',
        email: email || 'firman@example.com',
        role: 'customer',
      });
      navigate('/berandaku');
    }
  };

  const handleDemoCustomer = () => {
    onLogin({
      id: 2,
      name: 'Firman Candra',
      email: 'firman@example.com',
      role: 'customer',
    });
    navigate('/berandaku');
  };

  const handleDemoAdmin = () => {
    onLogin({
      id: 1,
      name: 'Owner Warunk Media',
      email: 'owner@warunkmedia.com',
      role: 'admin',
    });
    navigate('/admin');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-surface rounded-card border border-line p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center space-y-2">
          <img
            src="/logo-warunkmedia.png"
            alt="Warunk Media"
            className="h-9 mx-auto object-contain"
          />
          <h1 className="font-heading font-extrabold text-2xl text-ink">
            Masuk ke Akun
          </h1>
          <p className="text-xs text-muted">
            Masuk untuk mengakses Berandaku atau Panel Pengelolaan Pesanan
          </p>
        </div>

        {/* Tab Pilihan Role */}
        <div className="grid grid-cols-2 gap-2 bg-canvas p-1 rounded-control text-xs font-semibold border border-line">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`py-2 rounded-md transition-colors ${
              role === 'customer'
                ? 'bg-primary text-white shadow-xs'
                : 'text-muted hover:text-ink'
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`py-2 rounded-md transition-colors ${
              role === 'admin'
                ? 'bg-primary text-white shadow-xs'
                : 'text-muted hover:text-ink'
            }`}
          >
            Owner / Admin
          </button>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-ink block mb-1">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-muted absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'admin' ? 'owner@warunkmedia.com' : 'firman@example.com'}
                className="w-full pl-9 pr-3 py-2 bg-canvas border border-line rounded-control text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-ink block mb-1">Kata Sandi</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-muted absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-canvas border border-line rounded-control text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-control text-xs font-semibold transition-colors shadow-xs"
          >
            Masuk sebagai {role === 'admin' ? 'Owner / Admin' : 'Customer'}
          </button>
        </form>

        {/* 1-Click Demo Login untuk Pengujian Cepat */}
        <div className="pt-4 border-t border-line space-y-2">
          <p className="text-[11px] font-bold text-muted uppercase text-center tracking-wider">
            Akses Demo Sekali Klik
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoCustomer}
              className="py-2 px-3 bg-canvas hover:bg-line border border-line rounded-control text-[11px] font-semibold text-ink flex items-center justify-center gap-1.5 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-primary" />
              <span>Demo Customer</span>
            </button>
            <button
              type="button"
              onClick={handleDemoAdmin}
              className="py-2 px-3 bg-canvas hover:bg-line border border-line rounded-control text-[11px] font-semibold text-ink flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
              <span>Demo Owner</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

