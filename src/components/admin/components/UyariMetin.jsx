import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../db/Firebase";
import toast from "react-hot-toast";

const AmacPanel = () => {
  const [odemeBilgi, setOdemeBilgi] = useState({
    metin: "",
  });

  useEffect(() => {
    const bilgiCek = async () => {
      try {
        const docRef = doc(db, "odeme", "ilanuyari");
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
      const docRef = doc(db, "odeme", "ilanuyari");
      await setDoc(docRef, odemeBilgi);
      toast.success("Bilgiler güncellendi.");
    } catch (error) {
      console.log(error);
      toast.error("Güncelleme sırasında hata oluştu.");
    }
  };

  return (
    <div className="duration-300 container max-w-screen-lg w-full border bg-zinc-100 p-4 rounded-xl">
      <p className="text-xl font-semibold">İlan Sayfası Uyarı Metni</p>
      <form className="mt-3 w-full" onSubmit={handleSubmit}>
        <textarea
          type="text"
          name="metin"
          value={odemeBilgi?.metin}
          onChange={handleChange}
          className="p-2 bg-white h-full border rounded-lg min-h-12 outline-none w-full focus:ring-2 ring-lime-200"
          placeholder="Kullanım Amacı Metni"
        />
        <button
          type="submit"
          className="p-2 mt-5 w-full bg-lime-400 text-white rounded-lg"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default AmacPanel;
