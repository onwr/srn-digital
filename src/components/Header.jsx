import {
  CircleUser,
  Wallet,
  Menu,
  ChevronDown,
  Home,
  Info,
  Clipboard,
  Phone,
  Truck,
  Shield,
  Globe,
  Building2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ad, setAd] = useState(null);
  const [adminState, setAdminState] = useState(null);
  const [userMenu, setUserMenu] = useState(false);

  useEffect(() => {
    const userAd = Cookies.get("ad");
    const admin = Cookies.get("admin");
    setAd(userAd);
    setAdminState(admin);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cikisHandler = () => {
    Cookies.remove("userUID");
    Cookies.remove("ad");
    setUserMenu(false);
    window.location.reload();
  };

  return (
    <div className="container mx-auto shadow-lg max-w-screen-xl px-0 rounded-b-lg">
      <div className="flex py-2 items-center justify-between px-5">
        <a href="/">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-32 h-auto rounded-xl"
          />
        </a>
        <div className="md:hidden">
          <Menu className="w-8 h-8 cursor-pointer" onClick={toggleMenu} />
        </div>
        <div className="hidden lg:flex flex-col gap-2">
          {ad ? (
            <div className="relative">
              <button
                onClick={() => setUserMenu(!userMenu)}
                className="flex uppercase lg:px-4 py-2 justify-center hover:bg-sky-500 transition-all rounded-xl bg-sky-300 items-center gap-2"
              >
                {ad} <ChevronDown />
              </button>
              {userMenu && (
                <div className="absolute bg-gray-500 bg-opacity-70 top-12 rounded-xl w-full p-2 border flex flex-col gap-2">
                  <button
                    onClick={cikisHandler}
                    className="w-full bg-red-500 rounded-full text-white"
                  >
                    Çıkış Yap
                  </button>
                  {adminState && (
                    <button
                      onClick={() => (window.location.href = "/admin")}
                      className="w-full bg-lime-500 rounded-full text-white"
                    >
                      Panel
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <a
              href="/kullanici/giris"
              className="flex px-4 py-2 justify-center hover:bg-sky-500 transition-all rounded-xl bg-sky-400 items-center gap-2"
            >
              Üyelik İşlemleri <CircleUser />
            </a>
          )}
          <a
            href="/odeme"
            className="flex px-4 py-2 justify-center hover:bg-yellow-500 transition-all rounded-xl bg-yellow-400 items-center gap-2"
          >
            Ödeme <Wallet />
          </a>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden text-xs flex flex-col items-center gap-4 py-4 bg-zinc-50 shadow-inner transition-all">
          <div className="grid grid-cols-2 gap-4 w-full">
            <a
              href="/kullanici/giris"
              className="flex items-center gap-2 bg-lime-300 px-4 py-2 rounded hover:bg-lime-400 transition-all text-center justify-center"
            >
              Üyelik <CircleUser />
            </a>
            <a
              href="/odeme"
              className="flex items-center gap-2 bg-yellow-300 px-4 py-2 rounded hover:bg-yellow-400 transition-all text-center justify-center"
            >
              Ödeme <Wallet />
            </a>

            <a
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-lime-400 transition-all w-full text-center"
              style={{ maxWidth: "200px" }}
              href="/"
            >
              <Home /> Ana Sayfa
            </a>
            <a
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 transition-all w-full text-center"
              style={{ maxWidth: "200px" }}
              href="/amac"
            >
              <Info /> Kullanım Amacı
            </a>
            <a
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 transition-all w-full text-center"
              style={{ maxWidth: "200px" }}
              href="/ilan-birak"
            >
              <Clipboard /> İlan Bırak
            </a>
            <a
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 transition-all w-full text-center"
              style={{ maxWidth: "200px" }}
              href="/iletisim"
            >
              <Phone /> İletişim
            </a>
            <a
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 transition-all w-full text-center"
              style={{ maxWidth: "200px" }}
              href="/musavirlikler"
            >
              <Shield /> Gümrük Müşavirlikleri
            </a>
            <a
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 transition-all w-full text-center"
              style={{ maxWidth: "200px" }}
              href="/antrepolar"
            >
              <Truck /> Genel Antrepolar
            </a>
            <a
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 transition-all w-full text-center"
              style={{ maxWidth: "200px" }}
              href="/sirketler"
            >
              <Building2 /> Taşıma Şirketleri
            </a>
            <a
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 transition-all w-full text-center"
              style={{ maxWidth: "200px" }}
              href="/acenteler"
            >
              <Globe /> Forwarder/Acenteler
            </a>
          </div>
        </div>
      )}

      <div className="hidden md:grid md:grid-cols-4 md:text-xs lg:flex xl:text-sm justify-center py-4 border-t shadow-inner items-center gap-1">
        <a
          className="flex items-center gap-2 px-4 lg:px-2 py-2 rounded hover:bg-gray-200 transition-all"
          href="/"
        >
          <Home className="size-5" /> Ana Sayfa
        </a>
        <a
          className="flex items-center gap-2 px-4 lg:px-2 py-2 rounded hover:bg-gray-200 transition-all"
          href="/amac"
        >
          <Info className="size-5" /> Kullanım Amacı
        </a>
        <a
          className="flex items-center gap-2 px-4 lg:px-2 py-2 rounded hover:bg-gray-200 transition-all"
          href="/ilan-birak"
        >
          <Clipboard className="size-5" /> İlan Bırak
        </a>
        <a
          className="flex items-center gap-2 px-4 lg:px-2 py-2 rounded hover:bg-gray-200 transition-all"
          href="/iletisim"
        >
          <Phone className="size-5" /> İletişim
        </a>
        <a
          className="flex items-center gap-2 px-4 lg:px-2 py-2 rounded hover:bg-gray-200 transition-all"
          href="/musavirlikler"
        >
          <Shield className="size-5" /> Gümrük Müşavirlikleri
        </a>
        <a
          className="flex items-center gap-2 px-4 lg:px-2 py-2 rounded hover:bg-gray-200 transition-all"
          href="/antrepolar"
        >
          <Truck className="size-5" /> Genel Antrepolar
        </a>
        <a
          className="flex items-center gap-2 px-4 lg:px-2 py-2 rounded hover:bg-gray-200 transition-all"
          href="/sirketler"
        >
          <Building2 className="size-5" /> Taşıma Şirketleri
        </a>
        <a
          className="flex items-center gap-2 px-4 lg:px-2 py-2 rounded hover:bg-gray-200 transition-all"
          href="/acenteler"
        >
          <Globe className="size-5" /> Forwarder/Acenteler
        </a>
      </div>
    </div>
  );
};

export default Header;
