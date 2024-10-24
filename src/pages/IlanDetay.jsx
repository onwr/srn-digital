import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../db/Firebase'
import Cookies from "js-cookie";
import useEmblaCarousel from "embla-carousel-react";
import ReactModal from "react-modal";
import { Pencil } from "lucide-react";
import Footer from '../components/Footer'


const IlanDetay = () => {
    const {id} = useParams();
    const [ilan, setIlanData] = useState({})
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const userUID = Cookies.get("userUID");
    const [selectedImage, setSelectedImage] = useState("");
    const [viewportRef, embla] = useEmblaCarousel({ loop: false });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    useEffect(() => {
        const veriCek = async () => {
            const docRef = doc(db, "ilanlar", id)
            const docSnap = await getDoc(docRef)
            
            if (docSnap.exists()) {
                setIlanData(docSnap.data())
                console.log(ilan);
            }
        }

        if(id) {
            veriCek()
        }
    }, [id])

    useEffect(() => {
        if (embla) {
          embla.on("select", () => {
            setPrevBtnEnabled(embla.canScrollPrev());
            setNextBtnEnabled(embla.canScrollNext());
          });
        }
      }, [embla]);
    
    
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
    <div>
        <Header />

        <div className='container mt-3 mx-auto max-w-screen-xl'>
            <button className='w-40 bg-red-400 text-white py-2 rounded-lg '>
            <Link to='/' >Geri</Link>
            </button>
        </div>
        <div className='container mx-auto max-w-screen-xl border p-5 bg-gradient-to-b from-lime-50 mt-5 rounded'>
        {ilan.images && ilan.images.length > 0 && (
        <div className="w-full">
          {ilan.images.length > 0 && (
            <div className="mt-2 relative">
              <div className="overflow-hidden" ref={viewportRef}>
                <div className="flex gap-2 items-center justify-start">
                  {ilan.images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="w-full mx-auto relative h-full max-w-[500px] max-h-[500px]"
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
            Gümrük <br />
            <span className="font-normal">
              {ilan.gumruklu ? "Serbest Dolaşımda" : "Serbest Dolaşımda Değil"}
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

        <Footer />
    </div>


  )
}

export default IlanDetay