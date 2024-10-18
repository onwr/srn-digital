import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../db/Firebase";
import toast from "react-hot-toast";
import useEmblaCarousel from "embla-carousel-react";
import ReactModal from "react-modal";

const OnayBekleyenler = () => {
  const [ilanData, setIlanData] = useState([]);
  const [viewportRef, embla] = useEmblaCarousel();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const ilanCek = async () => {
      try {
        const ref = collection(db, "ilanlar");
        const docSnap = await getDocs(ref);

        const onayBekleyenler = [];

        docSnap.forEach((ilan) => {
          const data = ilan.data();
          onayBekleyenler.push({
            id: ilan.id,
            ...data,
          });
        });

        setIlanData(onayBekleyenler);
      } catch (error) {
        toast.error("Sunucuda bir sorun var.");
        console.log(error);
      }
    };

    ilanCek();
  }, []);

  useEffect(() => {
    if (embla) {
      embla.on("select", () => {
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
      });
    }
  }, [embla]);

  const handleIlanKaldir = async (ilanId) => {
    try {
      const ilanRef = doc(db, "ilanlar", ilanId);

      await deleteDoc(ilanRef);

      toast.success(ilanId + " Kodlu ilan kaldırıldı.");
      setIlanData((prevIlanData) =>
        prevIlanData.filter((ilan) => ilan.id !== ilanId)
      );
    } catch (error) {
      toast.error("Sistemde bir sorun var");
      console.log(error);
    }
  };

  const scrollPrev = () => embla && embla.scrollPrev();
  const scrollNext = () => embla && embla.scrollNext();

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="duration-300  rounded-xl bg-zinc-100 container max-w-screen-lg w-full border p-5">
      <p className="text-2xl font-semibold">Tüm İlanlar</p>
      <div className="grid grid-cols-1 gap-4">
        {ilanData.length > 0 ? (
          ilanData.map((ilan) => (
            <div className="border flex flex-col md:flex-row gap-5 rounded-lg shadow-lg bg-white p-4">
              {ilan.images && ilan.images.length > 0 && (
                <div className="w-full md:w-1/3">
                  <div className="mb-3">
                    <img
                      src={ilan.images[0]}
                      alt="Kapak Görseli"
                      className="rounded cursor-pointer w-full h-64 object-cover"
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
                              className="min-w-[100px] relative h-[100px]"
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
                <p className="text-xs absolute right-28 top-0 font-semibold bg-sky-200 p-1 rounded text-gray-700">
                  {ilan.creationDate}
                </p>
                <p className="text-xs absolute right-0 top-0 font-semibold bg-lime-200 p-1 rounded text-gray-700">
                  DSTAND145231
                </p>
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
                  <p className="text-md col-span-4 overflow-y-auto font-semibold text-gray-700">
                    Açıklama <br />
                    <span className="font-normal break-words max-h-32 overflow-y-auto">
                      {ilan.ozellikler}
                    </span>{" "}
                  </p>
                  <button
                    onClick={() => handleIlanKaldir(ilan.id)}
                    className="bg-red-500 p-2 border rounded-xl text-white hover:bg-red-600 duration-500"
                  >
                    İlanı Kaldır
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Henüz ilan yok.</p>
        )}
      </div>
    </div>
  );
};

export default OnayBekleyenler;
