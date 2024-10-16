import React, { useState } from "react";
import toast from "react-hot-toast";
import { auth, db } from "../../../db/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [unvan, setUnvan] = useState("");
  const [telefon, setTelefon] = useState("");
  const [posta, setPosta] = useState("");
  const [fPosta, setFPosta] = useState("");
  const [faturaBilgi, setFBilgi] = useState("");
  const [kulAd, setKulAd] = useState("");
  const [sifre, setSifre] = useState("");
  const navigate = useNavigate();

  const formatPhoneNumber = (value) => {
    if (!value) return value;

    const phoneNumber = value.replace(/[^\d]/g, "");

    if (phoneNumber.length <= 3) return phoneNumber;

    if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    if (phoneNumber.length <= 10) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3,
        6
      )} ${phoneNumber.slice(6)}`;
    }

    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8)}`;
  };

  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setTelefon(formattedPhoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        posta,
        sifre
      );
      const user = userCredential.user;

      await setDoc(doc(db, "kullanicilar", user.uid), {
        unvan,
        telefon,
        posta,
        fPosta,
        faturaBilgi,
        kulAd,
        sifre,
        uid: user.uid,
        olusturulmaTarih: new Date().toISOString(),
      });

      toast.success("Kayıt başarılı! Yönlendiriliyorsunuz...");
      setLoading(false);
      navigate("/kullanici/giris");
    } catch (error) {
      toast.error("Kayıt Başarısız.");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-20 flex items-center justify-center">
      <div className="container mx-auto md:border md:bg-zinc-50 md:p-5 flex items-center justify-center flex-col rounded-lg max-w-screen-md mt-5">
        <p className="text-center font-bold text-2xl">ÜYELİK</p>
        <p className="text-center text-lg text-gray-500">Kayıt Ol</p>
        <form
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col gap-2 w-full items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center md:grid  md:grid-cols-2 gap-2 w-full max-w-xl">
            <input
              type="text"
              value={unvan}
              onChange={(e) => setUnvan(e.target.value)}
              autoFocus
              className="p-2 max-w-xs text-center duration-300 outline-none focus:ring-1 ring-lime-300 w-full border rounded-md"
              placeholder="Ünvan"
            />
            <input
              type="tel"
              value={telefon}
              maxLength={14}
              onChange={handlePhoneChange}
              className="p-2 max-w-xs text-center duration-300 outline-none focus:ring-1 ring-lime-300 w-full border rounded-md"
              placeholder="Telefon"
            />
            <input
              type="email"
              value={posta}
              onChange={(e) => setPosta(e.target.value)}
              autoFocus
              className="p-2 max-w-xs text-center duration-300 outline-none focus:ring-1 ring-lime-300 w-full border rounded-md"
              placeholder="E-Posta"
            />
            <input
              type="email"
              value={fPosta}
              onChange={(e) => setFPosta(e.target.value)}
              className="p-2 max-w-xs text-center duration-300 outline-none focus:ring-1 ring-lime-300 w-full border rounded-md"
              placeholder="Faturanın İletilecegi E-Posta"
            />
            <textarea
              type="text"
              value={faturaBilgi}
              onChange={(e) => setFBilgi(e.target.value)}
              className="p-2 max-w-xs md:max-w-none col-span-2 min-h-10 max-h-32 text-center outline-none focus:ring-1 ring-lime-300 w-full border rounded-md"
              placeholder="Fatura için diğer bilgiler"
            />
            <input
              type="text"
              value={kulAd}
              onChange={(e) => setKulAd(e.target.value)}
              autoFocus
              className="p-2 max-w-xs text-center duration-300 outline-none focus:ring-1 ring-lime-300 w-full border rounded-md"
              placeholder="Kullanıcı Adı"
            />
            <input
              type="password"
              value={sifre}
              onChange={(e) => setSifre(e.target.value)}
              className="p-2 max-w-xs text-center duration-300 outline-none focus:ring-1 ring-lime-300 w-full border rounded-md"
              placeholder="Şifre"
            />
          </div>
          <button
            type="submit"
            className="mt-2 hover:bg-lime-400 duration-300 w-full max-w-xs border py-2 bg-lime-300 rounded-xl"
          >
            {loading ? "Yükleniyor..." : "Kayıt Ol"}
          </button>
          <a
            href="/kullanici/giris"
            className="text-gray-400 text-sm font-medium underline"
          >
            Giriş yap
          </a>
        </form>
      </div>
    </div>
  );
};

export default Form;
