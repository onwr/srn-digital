import {
    collection,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  import React, { useEffect, useState } from "react";
  import { db } from "../../../db/Firebase";
  import toast from "react-hot-toast";
  import Modal from "react-modal";
  
  const Kullanicilar = () => {
    const [kullaniciData, setKullaniciData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [kullaniciDetay, setKullaniciDetay] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
  
    useEffect(() => {
      const veriCek = async () => {
        try {
          const qDoc = collection(db, "kullanicilar");
          const donenSnap = await getDocs(qDoc);
          const donenArr = donenSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setKullaniciData(donenArr);
        } catch (error) {
          toast.error("Hata oluştu");
          console.log(error);
        }
      };
  
      veriCek();
    }, []);
  
    const kullaniciSil = async (id) => {
      try {
        await deleteDoc(doc(db, "kullanicilar", id));
        toast.success("Kullanıcı başarıyla silindi.");
        setKullaniciData(kullaniciData.filter(kullanici => kullanici.id !== id));
      } catch (error) {
        toast.error("Silme işlemi başarısız.");
        console.log(error);
      }
    };
  
    const kullaniciDuzenle = (kullanici) => {
      setIsModalOpen(true);
      setKullaniciDetay(kullanici);
      setIsEdit(true);
    };
  
    const kullaniciGuncelle = async () => {
      try {
        const docRef = doc(db, "kullanicilar", kullaniciDetay.id);
        await updateDoc(docRef, kullaniciDetay);
        toast.success("Kullanıcı başarıyla güncellendi.");
        setKullaniciData(kullaniciData.map(kullanici =>
          kullanici.id === kullaniciDetay.id ? kullaniciDetay : kullanici
        ));
        setIsModalOpen(false);
        setKullaniciDetay({});
        setIsEdit(false);
      } catch (error) {
        toast.error("Güncelleme işlemi başarısız.");
        console.log(error);
      }
    };
  
    const kullaniciYoneticiYap = async (id) => {
      try {
        const docRef = doc(db, "kullanicilar", id);
        await updateDoc(docRef, { admin: true });
        toast.success("Kullanıcı yönetici yapıldı.");
        setKullaniciData(kullaniciData.map(kullanici =>
          kullanici.id === id ? { ...kullanici, admin: true } : kullanici
        ));
      } catch (error) {
        toast.error("Yönetici yapma işlemi başarısız.");
        console.log(error);
      }
    };
  
    const kullaniciDondur = async (id) => {
      try {
        const docRef = doc(db, "kullanicilar", id);
        await updateDoc(docRef, { hesapDurum: false });
        toast.success("Kullanıcı üyeliği donduruldu.");
        setKullaniciData(kullaniciData.map(kullanici =>
          kullanici.id === id ? { ...kullanici, hesapDurum: false } : kullanici
        ));
      } catch (error) {
        toast.error("Üyelik dondurma işlemi başarısız.");
        console.log(error);
      }
    };
  
    const onayla = async (id) => {
      try {
        const docRef = doc(db, "kullanicilar", id);
        await updateDoc(docRef, { hesapDurum: true });
        toast.success("Kullanıcı onaylandı.");
        setKullaniciData(kullaniciData.map(kullanici =>
          kullanici.id === id ? { ...kullanici, hesapDurum: true } : kullanici
        ));
      } catch (error) {
        toast.error("Onaylama işlemi başarısız.");
        console.log(error);
      }
    };
  
    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = kullaniciData.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(kullaniciData.length / usersPerPage);
  
    return (
      <div className="container max-w-screen-lg border bg-zinc-100 p-4 rounded-xl">
        <p className="text-xl font-semibold">Kullanıcılar</p>
  
        <div className="mt-4">
          <h2 className="text-lg font-bold">Onaylı Kullanıcılar</h2>
          {currentUsers.filter(kullanici => kullanici.hesapDurum).map((kullanici) => (
            <div key={kullanici.id} className="border p-4 mb-4 rounded bg-white shadow">
              <h3 className="text-lg font-bold">{kullanici.kulAd} (ID: {kullanici.id})</h3>
              <p><strong>Oluşturulma Tarihi:</strong> {new Date(kullanici.olusturulmaTarih).toLocaleString()}</p>
              <p><strong>Durum:</strong> {kullanici.admin ? "Admin" : "Kullanıcı"}</p>
              <p><strong>Hesap Durum:</strong> Onaylı</p>
              <p><strong>Posta:</strong> {kullanici.posta}</p>
              <p><strong>Telefon:</strong> {kullanici.telefon}</p>
              <p><strong>Unvan:</strong> {kullanici.unvan}</p>
              <p><strong>Fatura Bilgisi:</strong> {kullanici.faturaBilgi}</p>
              <p><strong>Fatura Postası:</strong> {kullanici.fPosta}</p>
              <div className="flex gap-2 mt-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => kullaniciDuzenle(kullanici)}>Düzenle</button>
                <button className="bg-lime-500 text-white px-3 py-1 rounded" onClick={() => kullaniciYoneticiYap(kullanici.id)}>Yönetici Yap</button>
                <button className="bg-indigo-500 text-white px-3 py-1 rounded" onClick={() => kullaniciDondur(kullanici.id)}>Üyeliği Dondur</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => kullaniciSil(kullanici.id)}>Sil</button>
              </div>
            </div>
          ))}
        </div>
  
        <div className="mt-4">
          <h2 className="text-lg font-bold">Onay Bekleyenler</h2>
          {currentUsers.filter(kullanici => !kullanici.hesapDurum).map((kullanici) => (
            <div key={kullanici.id} className="border p-4 mb-4 rounded bg-white shadow">
              <h3 className="text-lg font-bold">{kullanici.kulAd} (ID: {kullanici.id})</h3>
              <p><strong>Oluşturulma Tarihi:</strong> {new Date(kullanici.olusturulmaTarih).toLocaleString()}</p>
              <p><strong>Durum:</strong> {kullanici.admin ? "Admin" : "Kullanıcı"}</p>
              <p><strong>Hesap Durum:</strong> Onay bekliyor</p>
              <p><strong>Posta:</strong> {kullanici.posta}</p>
              <p><strong>Telefon:</strong> {kullanici.telefon}</p>
              <p><strong>Unvan:</strong> {kullanici.unvan}</p>
              <p><strong>Fatura Bilgisi:</strong> {kullanici.faturaBilgi}</p>
              <p><strong>Fatura Postası:</strong> {kullanici.fPosta}</p>
              <div className="flex gap-2 mt-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => kullaniciDuzenle(kullanici)}>Düzenle</button>
                <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => onayla(kullanici.id)}>Onayla</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => kullaniciSil(kullanici.id)}>Sil</button>
              </div>
            </div>
          ))}
        </div>
  
        <div className="flex justify-between mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-gray-400 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            Önceki
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-gray-400 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            Sonraki
          </button>
        </div>
  
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="flex items-center justify-center min-h-screen"
          ariaHideApp={false}
        >
          <div className="p-4 bg-zinc-100 rounded-xl w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">{isEdit ? "Kullanıcı Düzenle" : "Yeni Kullanıcı Ekle"}</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Kullanıcı Adı"
                value={kullaniciDetay.kulAd || ""}
                onChange={(e) => setKullaniciDetay({ ...kullaniciDetay, kulAd: e.target.value })}
                className="p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Posta"
                value={kullaniciDetay.posta || ""}
                onChange={(e) => setKullaniciDetay({ ...kullaniciDetay, posta: e.target.value })}
                className="p-2 border rounded"
              />
              <input
                type="tel"
                placeholder="Telefon"
                value={kullaniciDetay.telefon || ""}
                onChange={(e) => setKullaniciDetay({ ...kullaniciDetay, telefon: e.target.value })}
                className="p-2 border rounded"
              />
              <textarea
                placeholder="Fatura Bilgisi"
                value={kullaniciDetay.faturaBilgi || ""}
                onChange={(e) => setKullaniciDetay({ ...kullaniciDetay, faturaBilgi: e.target.value })}
                className="p-2 border rounded"
              />
              <button
                onClick={kullaniciGuncelle}
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
  
  export default Kullanicilar;
  