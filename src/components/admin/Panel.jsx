import {
  CircleAlert,
  ClipboardType,
  Landmark,
  ListCheck,
  Pencil,
  Settings,
} from "lucide-react";
import React, { useState } from "react";
import OnayBekleyenler from "./components/OnayBekleyenler";
import OdemePanel from "./components/OdemePanel";
import AmacPanel from "./components/Amac";
import IletisimPanel from "./components/IletisimPanel";
import Acenteler from "./components/Acenteler";
import UyariMetin from "./components/UyariMetin";

const Sidebar = () => {
  const [aktifComp, setAktifComp] = useState(0);

  return (
    <div className="flex min-h-screen">
      <div className="max-w-xs hidden md:block w-full bg-black border-r">
        <img src="/images/logo.png" className="w-40 mx-auto mt-5" />
        <div className="flex flex-col pt-10 gap-3 pl-20">
          <button
            onClick={() => setAktifComp(0)}
            className={`w-full bg-white hover:ring ring-sky-500 duration-300 text-black ${
              aktifComp === 0 ? "border-r-8 border-sky-400" : ""
            }  flex gap-2 py-3 rounded-l-full items-center justify-center`}
          >
            Onay Bekleyen İlanlar <ListCheck />
          </button>
          <button
            onClick={() => setAktifComp(1)}
            className={`w-full bg-white hover:ring ring-sky-500 duration-300 text-black ${
              aktifComp === 1 ? "border-r-8 border-sky-400" : ""
            }  flex gap-2 py-3 rounded-l-full items-center justify-center`}
          >
            Ödeme Bilgileri <Landmark />
          </button>
          <button
            onClick={() => setAktifComp(2)}
            className={`w-full bg-white hover:ring ring-sky-500 duration-300 text-black ${
              aktifComp === 2 ? "border-r-8 border-sky-400" : ""
            }  flex gap-2 py-3 rounded-l-full items-center justify-center`}
          >
            Kullanım Amacı <ClipboardType />
          </button>
          <button
            onClick={() => setAktifComp(3)}
            className={`w-full bg-white hover:ring ring-sky-500 duration-300 text-black ${
              aktifComp === 3 ? "border-r-8 border-sky-400" : ""
            }  flex gap-2 py-3 rounded-l-full items-center justify-center`}
          >
            İlan Sayfası Uyarı <CircleAlert />
          </button>
          <button
            onClick={() => setAktifComp(4)}
            className={`w-full bg-white hover:ring ring-sky-500 duration-300 text-black ${
              aktifComp === 4 ? "border-r-8 border-sky-400" : ""
            }  flex gap-2 py-3 rounded-l-full items-center justify-center`}
          >
            İletişim Bilgileri <Pencil />
          </button>
          <button
            onClick={() => setAktifComp(5)}
            className={`w-full bg-white hover:ring ring-sky-500 duration-300 text-black ${
              aktifComp === 5 ? "border-r-8 border-sky-400" : ""
            }  flex gap-2 py-3 rounded-l-full items-center justify-center`}
          >
            Gümrük Müşavirlikleri <Settings />
          </button>
          <button
            onClick={() => setAktifComp(6)}
            className={`w-full bg-white hover:ring ring-sky-500 duration-300 text-black ${
              aktifComp === 6 ? "border-r-8 border-sky-400" : ""
            }  flex gap-2 py-3 rounded-l-full items-center justify-center`}
          >
            Genel Antrepolar <Settings />
          </button>
          <button
            onClick={() => setAktifComp(7)}
            className={`w-full bg-white hover:ring ring-sky-500 duration-300 text-black ${
              aktifComp === 7 ? "border-r-8 border-sky-400" : ""
            }  flex gap-2 py-3 rounded-l-full items-center justify-center`}
          >
            Taşıma Şirketleri <Settings />
          </button>
          <button
            onClick={() => setAktifComp(8)}
            className={`w-full bg-white hover:ring ring-sky-500 duration-300 text-black ${
              aktifComp === 8 ? "border-r-8 border-sky-400" : ""
            }  flex gap-2 py-3 rounded-l-full items-center justify-center`}
          >
            Forwarder / Acenteler <Settings />
          </button>
        </div>
      </div>
      <div className="flex-1 w-full flex items-center justify-center">
        {aktifComp === 0 && <OnayBekleyenler />}
        {aktifComp === 1 && <OdemePanel />}
        {aktifComp === 2 && <AmacPanel />}
        {aktifComp === 3 && <UyariMetin />}
        {aktifComp === 4 && <IletisimPanel />}
        {aktifComp === 8 && <Acenteler />}
      </div>
    </div>
  );
};

export default Sidebar;
