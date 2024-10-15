import { CircleUser, Wallet, Menu } from "lucide-react";
import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="container mx-auto border max-w-screen-xl border-t-0 rounded-b-lg px-0">
      <div className="flex py-2 items-center justify-between px-5">
        <img src="./images/logo.png" alt="Logo" />
        <div className="lg:hidden">
          <Menu className="w-8 h-8 cursor-pointer" onClick={toggleMenu} />
        </div>
        <div className="hidden lg:flex flex-col gap-2">
          <a
            href="/uyelik"
            className="flex px-4 py-2 hover:bg-lime-500 duration-300 rounded-xl bg-lime-400 items-center gap-2"
          >
            Üyelik İşlemleri <CircleUser />
          </a>
          <a
            href="/odeme"
            className="flex px-4 py-2 justify-center hover:bg-yellow-500 duration-300 rounded-xl bg-yellow-400 items-center gap-2"
          >
            Ödeme <Wallet />
          </a>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-center gap-3 py-3 bg-gray-100 shadow-inner">
          <a
            className="bg-lime-300 px-4 duration-300 py-1 rounded"
            href="/anasayfa"
          >
            Ana Sayfa
          </a>
          <a className="px-4 duration-300 py-1 rounded" href="/amac">
            Kullanım Amacı
          </a>
          <a className="px-4 duration-300 py-1 rounded" href="/ilan-birak">
            İlan Bırak
          </a>
          <a className="px-4 duration-300 py-1 rounded" href="/iletisim">
            İletişim
          </a>
          <a className="px-4 duration-300 py-1 rounded" href="/musavirlikler">
            Gümrük Müşavirlikleri
          </a>
          <a className="px-4 duration-300 py-1 rounded" href="/antrepolar">
            Genel Antrepolar
          </a>
          <a className="px-4 duration-300 py-1 rounded" href="/sirketler">
            Taşıma Şirketleri
          </a>
          <a className="px-4 duration-300 py-1 rounded" href="/acenteler">
            Forwarder/Acenteler
          </a>
        </div>
      )}

      {/* Bu kısımda aralarına dikey çizgi ekle linklerin  */}
      <div className="hidden lg:flex justify-center py-3 border-t shadow-inner items-center gap-3">
        <a
          className="px-4 duration-300 border-r border-gray-500 py-1"
          href="/anasayfa"
        >
          Ana Sayfa
        </a>
        <a
          className="px-4 duration-300 border-r border-gray-500 py-1"
          href="/amac"
        >
          Kullanım Amacı
        </a>
        <a
          className="px-4 duration-300 border-r border-gray-500 py-1"
          href="/ilan-birak"
        >
          İlan Bırak
        </a>
        <a
          className="px-4 duration-300 border-r border-gray-500 py-1"
          href="/iletisim"
        >
          İletişim
        </a>
        <a
          className="px-4 duration-300 border-r border-gray-500 py-1"
          href="/musavirlikler"
        >
          Gümrük Müşavirlikleri
        </a>
        <a
          className="px-4 duration-300 border-r border-gray-500 py-1"
          href="/antrepolar"
        >
          Genel Antrepolar
        </a>
        <a
          className="px-4 duration-300 border-r border-gray-500 py-1"
          href="/sirketler"
        >
          Taşıma Şirketleri
        </a>
        <a className="px-4 duration-300 py-1 rounded" href="/acenteler">
          Forwarder/Acenteler
        </a>
      </div>
    </div>
  );
};

export default Header;
