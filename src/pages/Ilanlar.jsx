import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { db } from "../db/Firebase";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";
import useEmblaCarousel from "embla-carousel-react";
import ReactModal from "react-modal";
import Cookies from "js-cookie";
import { Pencil } from "lucide-react";
import iller from "../helpers/il.json";
import Guncelle from "../modals/ilan/Guncelle";
import { Link } from "react-router-dom";

const Ilanlar = () => {
  const [ilanData, setIlanData] = useState([]);
  const [ilanGuncelle, setIlanGuncelle] = useState(false);
  const [ilanId, setIlanId] = useState("");
  const [selectedSehir, setSelectedSehir] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const illerListesi = Object.entries(iller).map(([key, value]) => ({
    id: key,
    ad: value,
  }));

  useEffect(() => {
    const ilanCek = async () => {
      try {
        const ref = collection(db, "ilanlar");
        const snap = await getDocs(ref);
        const onayliIlanlar = [];

        snap.forEach((ilan) => {
          const data = ilan.data();
          if (data.onay === true) {
            onayliIlanlar.push({
              id: ilan.id,
              ...data,
            });
          }
        });

        onayliIlanlar.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        setIlanData(onayliIlanlar);
      } catch (error) {
        toast.error("Sunucularda hata var.");
        console.log(error);
      }
    };

    ilanCek();
  }, []);

  

  const onClose = () => {
    setIlanGuncelle(false);
    setIlanId("");
  };

  const handleIlanGuncelle = (ilanid) => {
    setIlanId(ilanid);
    setIlanGuncelle(true);
  };

  const filteredIlanlar = ilanData.filter((ilan) =>
    (selectedSehir ? ilan.bulunduguIl === selectedSehir : true) &&
    (searchTerm ? ilan.esya.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  );

  const totalPages = Math.ceil(filteredIlanlar.length / itemsPerPage);

  const currentIlanlar = filteredIlanlar.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Header />
      <div className="container mx-auto max-w-screen-xl flex flex-col gap-5 py-5">
        <div className="flex items-center justify-between">
        <input
            type="text"
            placeholder="İlan ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md"
          />
          <select
            className="p-2 border rounded-md"
            value={selectedSehir}
            onChange={(e) => setSelectedSehir(e.target.value)}
          >
            <option value="">Tüm Şehirler</option>
            {illerListesi.map((il) => (
              <option key={il.id} value={il.ad}>
                {il.ad}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {currentIlanlar.length > 0 ? (
            currentIlanlar.map((ilan) => (
              <IlanItem
                key={ilan.id}
                ilan={ilan}
                ilanGuncelleModal={handleIlanGuncelle}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">Henüz onaylı ilan yok.</p>
          )}
        </div>

        <div className="flex justify-between mt-4 px-2 md:px-0">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Önceki
          </button>
          <span>
            Sayfa {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Sonraki
          </button>
        </div>
      </div>
      {ilanGuncelle && <Guncelle ilanID={ilanId} onClose={onClose} />}
      <Footer />
    </div>
  );
};

const IlanItem = ({ ilan, ilanGuncelleModal }) => {
  const [viewportRef, embla] = useEmblaCarousel({ loop: false });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const userUID = Cookies.get("userUID");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (embla) {
      embla.on("select", () => {
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
      });
    }
  }, [embla]);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const scrollPrev = () => embla && embla.scrollPrev();
  const scrollNext = () => embla && embla.scrollNext();

  return (
    <div className="border items-center flex flex-row gap-5 rounded-lg shadow-lg bg-white p-4">
      {ilan.images && ilan.images.length > 0 && (
        <div className="w-1/2">
          <div className="mt-2 relative">
            <div className="overflow-hidden" ref={viewportRef}>
              <div className="flex gap-2 items-center justify-start">
                {ilan.images.slice(1).map((image, index) => (
                  <div
                    key={index}
                    className="max-w-[200px] mx-auto relative max-h-[700px]"
                  >
                    <img
                      src={image}
                      alt={`İlan Görseli ${index + 1}`}
                      className="rounded min-w-[100px] mx-auto cursor-pointer w-full h-full object-cover"
                      onClick={() => openModal(image)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full ${
                !prevBtnEnabled ? "opacity-50" : ""
              }`}
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
            >
              ‹
            </button>
            <button
              className={`absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full ${
                !nextBtnEnabled ? "opacity-50" : ""
              }`}
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
            >
              ›
            </button>
          </div>
        </div>
      )}

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
        ariaHideApp={false}
      >
        <div className="relative max-w-screen-lg">
          <img
            src={selectedImage}
            alt="Full Görsel"
            className="w-auto h-auto object-cover"
          />
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-2xl font-bold"
          >
            &times;
          </button>
        </div>
      </ReactModal>

      <div className="flex-grow flex-1 relative">
        <h3 className="text-xl font-bold text-gray-800 pt-10 md:pt-0">
          {ilan.esya}
        </h3>
        {userUID === ilan.userUID && (
          <Pencil
            onClick={() => ilanGuncelleModal(ilan.id)}
            className="absolute right-0 cursor-pointer hover:bg-lime-500 duration-500 p-2 size-9 bg-black text-white rounded-xl top-10"
          />
        )}
        <p className="text-xs absolute right-0 top-0 font-semibold bg-sky-200 p-1 rounded text-gray-700">
          {ilan.creationDate}
        </p>
        <div className="grid grid-cols-1 gap-3 mt-3">
          <p className="text-md font-semibold text-gray-700">
            Bulunduğu İl <br />
            <span className="font-normal">{ilan.bulunduguIl}</span>
          </p>
          <Link to={`/ilan/${ilan.id}`} className="w-1/2 text-center py-1 bg-lime-400 rounded-xl ml-auto hover:underline">Detay</Link>
        </div>
      </div>
    </div>
  );
};

export default Ilanlar;
