import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { db } from "../db/Firebase";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const Iletisim = () => {
  const [gelenData, setGelenData] = useState(null);

  useEffect(() => {
    const iletisimCek = async () => {
      try {
        const docRef = doc(db, "odeme", "iletisim");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setGelenData(docSnap.data());
        }
      } catch (error) {
        toast.error("Sunucuda bir sorun var");
        console.log(error);
      }
    };

    iletisimCek();
  }, []);

  return (
    <div>
      <Header />

      <div className="py-5 md:py-20">
        <div className="container mx-auto max-w-screen-xl">
          <p className="text-center text-2xl font-bold">İletişim</p>
          {gelenData ? (
            <div className="flex flex-col lg:flex-row gap-5 items-center justify-center">
              <p className="text-center mt-5 w-full max-w-xs bg-zinc-300 bg-opacity-20 border border-black/10 mx-auto rounded shadow-inner py-1">
                Adres <br />
                <span className="font-bold text-lg">{gelenData.adres}</span>
              </p>
              <p className="text-center mt-5 w-full max-w-xs bg-zinc-300 bg-opacity-20 border border-black/10 mx-auto rounded shadow-inner py-1">
                Telefon <br />
                <span className="font-bold text-lg">{gelenData.tel}</span>
              </p>
              <p className="text-center mt-5 w-full max-w-xs bg-zinc-300 bg-opacity-20 border border-black/10 mx-auto rounded shadow-inner py-1">
                E-Posta <br />
                <span className="font-bold text-lg">{gelenData.mail}</span>
              </p>
            </div>
          ) : (
            <p>Yükleniyor...</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Iletisim;
