import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Acenteler from "./pages/Acenteler";
import Sirketler from "./pages/Sirketler";
import Antrepolar from "./pages/Antrepolar";
import Musavirlikler from "./pages/Musavirlikler";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/acenteler" element={<Acenteler />} />
          <Route path="/sirketler" element={<Sirketler />} />
          <Route path="/antrepolar" element={<Antrepolar />} />
          <Route path="/musavirlikler" element={<Musavirlikler />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
