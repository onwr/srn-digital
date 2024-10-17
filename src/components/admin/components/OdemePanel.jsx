import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../db/Firebase";
import toast from "react-hot-toast";

const OdemePanel = () => {
  const [odemeBilgi, setOdemeBilgi] = useState({
    banka: "",
    hesapNo: "",
    iban: "",
    sube: "",
    ucret: "",
    posta: "",
    numara: "",
    unvan: "",
  });

  useEffect(() => {
    const bilgiCek = async () => {
      try {
        const docRef = doc(db, "odeme", "bilgi");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOdemeBilgi(docSnap.data());
          toast.success("Bilgiler getirildi.");
        } else {
          toast.error("Bilgiler getirilemedi.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Hata oluştu.");
      }
    };

    bilgiCek();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOdemeBilgi((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "odeme", "bilgi");
      await setDoc(docRef, odemeBilgi);
      toast.success("Bilgiler güncellendi.");
    } catch (error) {
      console.log(error);
      toast.error("Güncelleme sırasında hata oluştu.");
    }
  };

  return (
    <div className="duration-300 container max-w-screen-lg w-full border bg-zinc-100 p-4 rounded-xl">
      <p className="text-xl font-semibold">Ödeme Bilgilerini Güncelle</p>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3"
        onSubmit={handleSubmit}
      >
        {[
          "banka",
          "hesapNo",
          "iban",
          "sube",
          "ucret",
          "posta",
          "numara",
          "unvan",
        ].map((field, index) => (
          <input
            key={index}
            type="text"
            name={field}
            value={odemeBilgi[field]}
            onChange={handleChange}
            className="p-2 bg-white border rounded-lg duration-300 outline-none focus:ring-2 ring-lime-200"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          />
        ))}
        <button
          type="submit"
          className="col-span-1 md:col-span-2 p-2 bg-lime-400 text-white rounded-lg"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default OdemePanel;
