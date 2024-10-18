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

const Ilanlar = () => {
  const [ilanData, setIlanData] = useState([]);
  const [ilanGuncelle, setIlanGuncelle] = useState(false);
  const [ilanId, setIlanId] = useState("");
  const [selectedSehir, setSelectedSehir] = useState("");

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
    selectedSehir ? ilan.bulunduguIl === selectedSehir : true
  );

  return (
    <div>
      <Header />
      <div className="container mx-auto max-w-screen-xl flex flex-col gap-5 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Onaylı İlanlar</h2>
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
          {filteredIlanlar.length > 0 ? (
            filteredIlanlar.map((ilan, ilanIndex) => (
              <IlanItem
                key={ilanIndex}
                ilan={ilan}
                ilanGuncelleModal={handleIlanGuncelle}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">Henüz onaylı ilan yok.</p>
          )}
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
    <div className="border items-center flex flex-col gap-5 rounded-lg shadow-lg bg-white p-4">
      {ilan.images && ilan.images.length > 0 && (
        <div className="w-full">
          <div className="mb-3">
            <img
              src={ilan.images[0]}
              alt="Kapak Görseli"
              className="rounded border mx-auto cursor-pointer w-auto h-52 object-cover"
              onClick={() => openModal(ilan.images[0])}
            />
          </div>

          {ilan.images.length > 1 && (
            <div className="mt-2 relative">
              <div className="overflow-hidden" ref={viewportRef}>
                <div className="flex gap-2 items-center justify-start">
                  {ilan.images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="min-w-[100px] mx-auto relative h-[100px]"
                    >
                      <img
                        src={image}
                        alt={`İlan Görseli ${index + 1}`}
                        className="rounded mx-auto cursor-pointer w-full h-full object-cover"
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
          )}
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

      <div className="flex-grow relative">
        <h3 className="text-xl font-bold text-gray-800 pt-10 md:pt-0">
          {ilan.unvan}
        </h3>
        {userUID === ilan.userUID && (
          <Pencil
            onClick={() => ilanGuncelleModal(ilan.id)}
            className="absolute right-0 cursor-pointer hover:bg-lime-500 duration-500 p-2 size-9 bg-black text-white rounded-xl top-10"
          />
        )}
        <p className="text-xs absolute right-28 top-0 font-semibold bg-sky-200 p-1 rounded text-gray-700">
          {ilan.creationDate}
        </p>
        <p className="text-xs absolute right-0 top-0 font-semibold bg-lime-200 p-1 rounded text-gray-700">
          {ilan.ilanNo}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-3">
          <p className="text-md font-semibold text-gray-700">
            İletişim <br />
            <span className="font-normal">
              {userUID ? ilan.iletisim : "Giriş yapınız"}
            </span>
          </p>
          <p className="text-md font-semibold text-gray-700">
            Eşya <br /> <span className="font-normal">{ilan.esya}</span>
          </p>
          <p className="text-md font-semibold text-gray-700">
            Mevcut Miktar <br />
            <span className="font-normal">{ilan.mevcutMiktar}</span>
          </p>
          <p className="text-md font-semibold text-gray-700">
            Fiyat <br />
            <span className="font-normal">
              {ilan.miktarFiyati} {ilan.paraBirimi} <br />
              <span className="text-xs">{ilan.miktarBirimi}</span>
            </span>
          </p>
          <p className="text-md font-semibold text-gray-700">
            Gümrüklü Mü <br />
            <span className="font-normal">
              {ilan.gumruklu ? "Evet" : "Hayır"}
            </span>
          </p>
          <p className="text-md font-semibold text-gray-700">
            Bulunduğu Yer <br />
            <span className="font-normal">{ilan.bulunduguYer}</span>
          </p>
          <p className="text-md font-semibold text-gray-700">
            Bulunduğu İl <br />
            <span className="font-normal">{ilan.bulunduguIl}</span>
          </p>
          <p className="text-md font-semibold text-gray-700">
            Menşe Ülke <br />
            <span className="font-normal">{ilan.menseUlke}</span>
          </p>
          <p className="text-md col-span-2 xl:col-span-4 overflow-y-auto font-semibold text-gray-700">
            Açıklama <br />
            <span className="font-normal break-words max-h-32 overflow-y-auto">
              {ilan.ozellikler}
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ilanlar;
