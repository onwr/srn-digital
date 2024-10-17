import { collection, getDocs } from "firebase/firestore";
import { CirclePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { db } from "../../../db/Firebase";
import toast from "react-hot-toast";

const Acenteler = () => {
  const [sirketData, setSirketData] = useState([]);

  useEffect(() => {
    const veriCek = async () => {
      try {
        const qDoc = collection(db, "acenteler");
        const donenSnap = await getDocs(qDoc);

        const donenArr = donenSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSirketData(donenArr);
      } catch (error) {
        toast.error("Hata olustu");
        console.log(error);
      }
    };

    veriCek();
  }, []);

  return (
    <div className="container max-w-screen-lg border bg-zinc-100 p-4 rounded-xl">
      <p className="text-xl font-semibold">Forwarder / Acenteler</p>
      <div className="grid grid-cols-4  gap-3 mt-5">
        <button className="p-12 bg-lime-300 hover:bg-lime-200 duration-300 flex items-center justify-center rounded-lg">
          <CirclePlus className="size-20" />
        </button>
        {sirketData.map((sirket, index) => (
          <div
            key={index}
            className="p-2 border flex flex-col gap-2 justify-center items-center rounded bg-white  duration-300"
          >
            <p className="text-center text-blue-600 font-semibold text-lg">
              {sirket.sehir}
            </p>
            <p className="text-xs border-black/20 w-full text-center p-2 border rounded text-black">
              {sirket.metin}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Acenteler;
