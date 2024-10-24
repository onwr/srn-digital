import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { CirclePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { db } from "../../../db/Firebase";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Sirketler = () => {
  const [sirketData, setSirketData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sehir, setSehir] = useState("");
  const [metin, setMetin] = useState("");
  const [logo, setLogo] = useState(null); // Fotoğraf durumu
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const veriCek = async () => {
      try {
        const qDoc = collection(db, "sirketler");
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

  const acenteEkle = async () => {
    try {
      let logoURL = null;

      // Fotoğraf yükleme
      if (logo) {
        const storage = getStorage();
        const logoRef = ref(storage, `photos/${logo.name}`);
        await uploadBytes(logoRef, logo);
        logoURL = await getDownloadURL(logoRef);
      }

      if (isEdit) {
        const docRef = doc(db, "sirketler", editId);
        await updateDoc(docRef, { sehir, metin, logo: logoURL });
        toast.success("Şirket başarıyla güncellendi.");
      } else {
        await addDoc(collection(db, "sirketler"), { sehir, metin, logo: logoURL });
        toast.success("Şirket başarıyla eklendi.");
      }

      setIsModalOpen(false);
      setSehir("");
      setMetin("");
      setLogo(null); // Fotoğraf durumunu sıfırla
      setIsEdit(false);
      setEditId(null);
    } catch (error) {
      toast.error("Hata oluştu.");
      console.log(error);
    }
  };

  const acenteSil = async (id) => {
    try {
      await deleteDoc(doc(db, "sirketler", id));
      toast.success("Şirket başarıyla silindi.");
      setSirketData(sirketData.filter((sirket) => sirket.id !== id));
    } catch (error) {
      toast.error("Silme işlemi başarısız.");
      console.log(error);
    }
  };

  const acenteDuzenle = (sirket) => {
    setIsModalOpen(true);
    setSehir(sirket.sehir);
    setMetin(sirket.metin);
    setLogo(null); // Fotoğraf durumunu sıfırla
    setIsEdit(true);
    setEditId(sirket.id);
  };

  return (
    <div className="container max-w-screen-lg border bg-zinc-100 p-4 rounded-xl">
      <p className="text-xl font-semibold">Taşıma Şirketleri</p>
      <div className="grid grid-cols-4 gap-3 mt-5">
        <button
          className="p-12 bg-lime-300 hover:bg-lime-200 duration-300 flex items-center justify-center rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <CirclePlus className="size-20" />
        </button>

        {sirketData.map((sirket, index) => (
          <div
            key={index}
            className="p-2 border flex flex-col gap-2 justify-center items-center rounded bg-white duration-300"
          >
            <p className="text-center text-blue-600 font-semibold text-lg">
              {sirket.sehir}
            </p>
            <p className="text-xs border-black/20 w-full text-center p-2 border rounded text-black">
              {sirket.metin}
            </p>
            {sirket.logo && <img src={sirket.logo} alt="Logo" className="h-full w-full" />}
            <div className="flex gap-2 mt-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => acenteDuzenle(sirket)}
              >
                Düzenle
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => acenteSil(sirket.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="flex items-center justify-center min-h-screen"
        ariaHideApp={false}
      >
        <div className="p-4 bg-zinc-100 rounded-xl w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">
            {isEdit ? "Düzenle" : "Yeni Ekle"}
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Şehir"
              value={sehir}
              onChange={(e) => setSehir(e.target.value)}
              className="p-2 border rounded"
            />
            <textarea
              placeholder="Metin"
              value={metin}
              onChange={(e) => setMetin(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogo(e.target.files[0])}
              className="p-2 border rounded"
            />
            <button
              onClick={acenteEkle}
              className="bg-lime-400 text-white py-2 rounded"
            >
              {isEdit ? "Güncelle" : "Ekle"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Sirketler;
