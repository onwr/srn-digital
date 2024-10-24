import React, { useEffect, useState } from "react";
import { db } from "../../db/Firebase";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";

const List = () => {
  const [sirketData, setSirketData] = useState(null);

  useEffect(() => {
    const acenteCek = async () => {
      try {
        const qDoc = collection(db, "antrepolar");
        const donenVeri = await getDocs(qDoc);

        const acenteArr = donenVeri.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSirketData(acenteArr);
      } catch (error) {
        toast.error("Veriler çekilemedi.");
        console.error(error);
      }
    };

    acenteCek();
  }, []);

  return (
    <div className="container mx-auto border p-3 max-w-screen-xl mt-5 rounded ">
      <p className="text-center text-2xl font-bold">Genel Antrepolar</p>
      {sirketData ? (
        <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {sirketData.map((sirket, index) => (
            <div
              key={index}
              className="p-2 border rounded hover:bg-slate-50  duration-300"
            >
              <img src={sirket.logo} />
              <p className="text-center text-blue-600 font-semibold text-lg">
                {sirket.sehir}
              </p>
              <p className="text-xs border-black/20 text-center p-2 border mt-2 rounded text-black">
                {sirket.metin}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-5">Yükleniyor...</p>
      )}
    </div>
  );
};

export default List;
