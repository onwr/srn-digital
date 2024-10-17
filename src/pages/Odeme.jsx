import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { db } from "../db/Firebase";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const Odeme = () => {
  const [gelenData, setGelenData] = useState(null);

  useEffect(() => {
    const odemeFetch = async () => {
      try {
        const docRef = doc(db, "odeme", "bilgi");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setGelenData(docSnap.data());
        }
      } catch (error) {
        toast.error("Sunucuda bir sorun var.");
        console.log(error);
      }
    };

    odemeFetch();
  }, []);

  return (
    <div>
      <Header />

      <div className="py-5 md:py-20">
        <div className="container mx-auto max-w-screen-xl">
          <p className="text-center text-2xl font-bold">Ödeme Bilgileri</p>
          {gelenData ? (
            <div className="md:grid md:grid-cols-2 px-2 xl:px-0 lg:grid-cols-4 gap-5">
              <p className="text-center mt-5 w-full max-w-xs bg-zinc-300 bg-opacity-20 border border-black/10 mx-auto rounded shadow-inner py-1">
                IBAN <br />
                <span className="font-bold text-lg">{gelenData.iban}</span>
              </p>
              <p className="text-center mt-5 w-full max-w-xs bg-zinc-300 bg-opacity-20 border border-black/10 mx-auto rounded shadow-inner py-1">
                Hesap No <br />
                <span className="font-bold text-lg">{gelenData.hesapNo}</span>
              </p>
              <p className="text-center mt-5 w-full max-w-xs bg-zinc-300 bg-opacity-20 border border-black/10 mx-auto rounded shadow-inner py-1">
                Banka <br />
                <span className="font-bold text-lg">{gelenData.banka}</span>
              </p>
              <p className="text-center mt-5 w-full max-w-xs bg-zinc-300 bg-opacity-20 border border-black/10 mx-auto rounded shadow-inner py-1">
                Şube <br />
                <span className="font-bold text-lg">{gelenData.sube}</span>
              </p>
              <p className="text-center max-w-xs lg:col-span-4 lg:max-w-auto w-full mt-5 lg:w-full bg-zinc-300 bg-opacity-20 border border-black/10 mx-auto rounded shadow-inner py-1">
                Ünvan <br />
                <span className="font-bold text-lg">{gelenData.unvan} ₺</span>
              </p>
              <p className="text-center max-w-xs lg:col-span-4 lg:max-w-auto w-full mt-5 lg:w-full bg-zinc-300 bg-opacity-20 border border-black/10 mx-auto rounded shadow-inner py-1">
                Ücret <br />
                <span className="font-bold text-lg">{gelenData.ucret} ₺</span>
              </p>
            </div>
          ) : (
            <p>Yükleniyor...</p>
          )}
          <div className="max-w-xs md:max-w-xl p-2 mt-10 border shadow rounded-xl mx-auto border-red-400 w-full">
            <p className="text-red-500 text-center font-bold text-xl">
              UYARI !
            </p>
            {gelenData ? (
              <p className="text-sm mt-1 text-black text-center">
                Üyeliğinizin açılabilmesi için ödeme dekontunu açıklama kısmına{" "}
                <span className="font-bold">kullanıcı adı</span> ve{" "}
                <span className="font-bold">ünvan</span> bilginizi yazmanız ve
                ödeme dekontunu{" "}
                <span className="font-bold">{gelenData.posta}</span> adresine
                e-mail olarak iletmeniz gerekmektedir. <br />
                <span className="text-red-500">
                  Sorun yaşamanız durumunda{" "}
                  <span className="font-bold">{gelenData.numara}</span>{" "}
                  ulaşmanız gerekmektedir.
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Odeme;
