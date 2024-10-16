import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../db/Firebase";

const Amac = () => {
  const [metin, setMetin] = useState(null);

  useEffect(() => {
    const metinCek = async () => {
      try {
        const docRef = doc(db, "odeme", "amac");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setMetin(docSnap.data().metin);
        }
      } catch (error) {
        toast.error("Sunucuda bir sorun var");
        console.log(error);
      }
    };

    metinCek();
  }, []);

  return (
    <div>
      <Header />
      <div className="py-20 px-2 lg:px-0">
        <div className="container mx-auto border p-3 shadow-2xl rounded-lg max-w-screen-xl">
          <p className="text-center text-2xl font-bold">Kullanım Amacı</p>
          <p className="text-center text-sm font-medium mt-3">
            {metin ? metin : "Yükleniyor..."}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Amac;
