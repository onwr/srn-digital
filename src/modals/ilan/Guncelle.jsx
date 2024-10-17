import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../db/Firebase";
import toast from "react-hot-toast";

const Guncelle = ({ ilanID, onClose }) => {
  const [ilanData, setIlanData] = useState({
    miktarBirimi: "",
    esya: "",
    gumruklu: "",
    unvan: "",
    iletisim: "",
    paraBirimi: "",
    ozellikler: "",
    mevcutMiktar: "",
    bulunduguYer: "",
    bulunduguIl: "",
    menseUlke: "",
    miktarFiyati: "",
  });

  useEffect(() => {
    const veriCek = async () => {
      try {
        const docRef = doc(db, "ilanlar", ilanID);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const ilan = snap.data();
          setIlanData({
            miktarBirimi: ilan.miktarBirimi || "",
            esya: ilan.esya || "",
            gumruklu: ilan.gumruklu || "",
            unvan: ilan.unvan || "",
            iletisim: ilan.iletisim || "",
            paraBirimi: ilan.paraBirimi || "",
            ozellikler: ilan.ozellikler || "",
            mevcutMiktar: ilan.mevcutMiktar || "",
            bulunduguYer: ilan.bulunduguYer || "",
            bulunduguIl: ilan.bulunduguIl || "",
            menseUlke: ilan.menseUlke || "",
            miktarFiyati: ilan.miktarFiyati || "",
          });
        }
      } catch (error) {
        toast.error("Veri çekme hatası");
        console.error(error);
      }
    };

    veriCek();
  }, [ilanID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIlanData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "ilanlar", ilanID);
      await updateDoc(docRef, ilanData);
      toast.success("İlan başarıyla güncellendi!");
      onClose();
    } catch (error) {
      toast.error("Güncelleme başarısız!");
      console.error(error);
    }
  };

  return (
    <div className="fixed min-h-screen inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="max-w-xl bg-white rounded-lg w-full p-4">
        <p className="text-lg font-medium mb-4">İlan Güncelle</p>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium">Unvan</label>
            <input
              type="text"
              name="unvan"
              value={ilanData.unvan}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Eşya</label>
            <input
              type="text"
              name="esya"
              value={ilanData.esya}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Gümrüklü mü?</label>
            <select
              name="gumruklu"
              value={ilanData.gumruklu}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="Evet">Evet</option>
              <option value="Hayır">Hayır</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">İletişim</label>
            <input
              type="text"
              name="iletisim"
              value={ilanData.iletisim}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mevcut Miktar</label>
            <input
              type="text"
              name="mevcutMiktar"
              value={ilanData.mevcutMiktar}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Miktar Birimi</label>
            <input
              type="text"
              name="miktarBirimi"
              value={ilanData.miktarBirimi}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Para Birimi</label>
            <input
              type="text"
              name="paraBirimi"
              value={ilanData.paraBirimi}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Miktar Fiyatı</label>
            <input
              type="text"
              name="miktarFiyati"
              value={ilanData.miktarFiyati}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Menşe Ülke</label>
            <input
              type="text"
              name="menseUlke"
              value={ilanData.menseUlke}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Bulunduğu Yer</label>
            <input
              type="text"
              name="bulunduguYer"
              value={ilanData.bulunduguYer}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Bulunduğu İl</label>
            <input
              type="text"
              name="bulunduguIl"
              value={ilanData.bulunduguIl}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Özellikler</label>
            <textarea
              name="ozellikler"
              value={ilanData.ozellikler}
              onChange={handleInputChange}
              className="w-full max-h-20 min-h-10 p-2 border rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 py-2 px-4 border rounded bg-gray-300"
            >
              İptal
            </button>
            <button
              type="submit"
              className="py-2 px-4 border rounded bg-blue-500 text-white"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Guncelle;
