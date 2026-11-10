import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function Footer() {
  return (
    <footer id="kontak" className="w-full bg-[#1F1F1F] text-[#F7F6F4] pt-12 pb-24 md:pb-12 mt-16 no-print">
      <div className="max-w-[1120px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/10">
          {/* Kolom 1: Profil Usaha */}
          <div>
            <div className="bg-white p-2.5 rounded-lg inline-block mb-4">
              <img
                src="/logo-warunkmedia.jpg"
                alt="Warunk Media Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              <strong>PT Warunk Media Grup</strong> — Konveksi dan percetakan terpercaya di Semarang. Melayani pembuatan kaos, jaket, kemeja PDH, topi, dan merchandise dengan sistem tracking transparan.
            </p>
          </div>

          {/* Kolom 2: Kontak & Lokasi */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 font-heading">Workshop & Layanan</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Jl. Griya Prasetya Selatan VI No.183, Semarang 50166</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  0812-3456-7890 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <InstagramIcon className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="https://www.instagram.com/warunk_media/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  @warunk_media
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Senin – Sabtu: 08.30 – 17.00 WIB</span>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Navigasi Cepat */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 font-heading">Menu Tracking</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/cek-projek" className="hover:text-white transition-colors">Cek Status Pesanan</a>
              </li>
              <li>
                <a href="/berandaku" className="hover:text-white transition-colors">Daftar Pesananku (Berandaku)</a>
              </li>
              <li>
                <a href="#alur-projek" className="hover:text-white transition-colors">Alur Pemesanan Konveksi</a>
              </li>
              <li>
                <a href="#proses-projek" className="hover:text-white transition-colors">Tahapan & Proses Produksi</a>
              </li>
              <li>
                <a href="#deadline-projek" className="hover:text-white transition-colors">Estimasi & Aturan Deadline</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2">
          <p>© 2026 PT Warunk Media Grup. Hak cipta dilindungi.</p>
          <p className="text-gray-500">Konveksi Semarang · Sistem Tracking Produksi</p>
        </div>
      </div>
    </footer>
  );
}
