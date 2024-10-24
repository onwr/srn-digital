import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Ilanlar from "./pages/Ilanlar";
import Acenteler from "./pages/Acenteler";
import Sirketler from "./pages/Sirketler";
import Antrepolar from "./pages/Antrepolar";
import Musavirlikler from "./pages/Musavirlikler";
import Giris from "./pages/kullanici/Giris";
import Kayit from "./pages/kullanici/Kayit";
import Odeme from "./pages/Odeme";
import Iletisim from "./pages/Iletisim";
import Amac from "./pages/Amac";
import IlanOlustur from "./pages/IlanOlustur";
import Admin from "./pages/admin/Admin";
import Gizlilik from "./pages/Gizlilik";
import Kosullar from "./pages/Kosullar";
import Cerez from "./pages/Cerez";
import IlanDetay from "./pages/IlanDetay";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Ilanlar />} />
          <Route path="/ilan/:id" element={<IlanDetay />} />
          <Route path="/ilan-birak" element={<IlanOlustur />} />
          <Route path="/acenteler" element={<Acenteler />} />
          <Route path="/sirketler" element={<Sirketler />} />
          <Route path="/antrepolar" element={<Antrepolar />} />
          <Route path="/musavirlikler" element={<Musavirlikler />} />
          <Route path="/kullanici/giris" element={<Giris />} />
          <Route path="/kullanici/kayit" element={<Kayit />} />
          <Route path="/odeme" element={<Odeme />} />
          <Route path="/iletisim" element={<Iletisim />} />
          <Route path="/amac" element={<Amac />} />
          <Route path="/gizlilik" element={<Gizlilik />} />
          <Route path="/kvkk" element={<Kosullar />} />
          <Route path="/cerez" element={<Cerez />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
