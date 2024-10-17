import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { db } from "../db/Firebase";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";
import useEmblaCarousel from "embla-carousel-react";

const Ilanlar = () => {
  const [ilanData, setIlanData] = useState([]);

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

        setIlanData(onayliIlanlar);
      } catch (error) {
        toast.error("Sunucularda hata var.");
        console.log(error);
      }
    };

    ilanCek();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mx-auto max-w-screen-xl flex flex-col gap-5 py-5">
        <h2 className="text-2xl font-bold text-center mb-4">Onaylı İlanlar</h2>
        <div className="grid grid-cols-1 gap-4">
          {ilanData.length > 0 ? (
            ilanData.map((ilan, ilanIndex) => (
              <IlanItem key={ilanIndex} ilan={ilan} />
            ))
          ) : (
            <p className="text-center text-gray-600">Henüz onaylı ilan yok.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const IlanItem = ({ ilan }) => {
  const [viewportRef, embla] = useEmblaCarousel({ loop: false });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  useEffect(() => {
    if (embla) {
      embla.on("select", () => {
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
      });
    }
  }, [embla]);

  const handleImageClick = (image) => {
    const newWindow = window.open(image, "_blank");
    newWindow.focus();
  };

  const scrollPrev = () => embla && embla.scrollPrev();
  const scrollNext = () => embla && embla.scrollNext();

  return (
    <div className="border flex flex-col md:flex-row gap-5 rounded-lg shadow-lg bg-white p-4">
      <div className="w-full md:w-1/3">
        {ilan.images && ilan.images.length > 0 && (
          <div className="mt-2 relative">
            <div className="overflow-hidden" ref={viewportRef}>
              <div className="flex gap-2 items-center justify-start">
                {ilan.images.map((image, index) => (
                  <div key={index} className="min-w-[300px] relative h-[200px]">
                    <img
                      src={image}
                      alt={`İlan Görseli ${index + 1}`}
                      className="rounded mx-auto cursor-pointer w-full h-full object-cover"
                      onClick={() => handleImageClick(image)}
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
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-800">{ilan.unvan}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-3">
          <p className="text-md font-semibold text-gray-700">
            İletişim <br />
            <span className="font-normal">{ilan.iletisim}</span>
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
            <span className="font-normal">{ilan.miktarFiyati}</span>
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
          <p className="text-md col-span-3 overflow-y-auto font-semibold text-gray-700">
            Açıklama <br />
            <span className="font-normal break-words max-h-32 overflow-y-auto">
              {ilan.ozellikler}
            </span>{" "}
          </p>
          <p className="text-md font-semibold text-gray-700">
            Oluşturulma Tarihi <br />
            <span className="font-normal">{ilan.creationDate}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ilanlar;
