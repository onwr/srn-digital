import { collection, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../db/Firebase';
import toast from 'react-hot-toast';
import useEmblaCarousel from "embla-carousel-react";


const OnayBekleyenler = () => {
    const [ilanData, setIlanData] = useState([])
    const [viewportRef, embla] = useEmblaCarousel();


    useEffect(() => {
        const ilanCek = async () => {
            try {
                const ref = collection(db, "ilanlar");
                const docSnap = await getDocs(ref)

                const onayBekleyenler = [];

                docSnap.forEach((ilan) => {
                    const data = ilan.data();
                    if(data.onay === false) {
                        onayBekleyenler.push({
                            id: ilan.id,
                            ...data
                        })
                    }
                })

                setIlanData(onayBekleyenler)
            } catch (error) {
                toast.error("Sunucuda bir sorun var.")
                console.log(error)
            }
        }

        ilanCek()
    }, [])

    const handleIlanOnayla = async (ilanId) => {
        try {
            const ilanRef = doc(db, "ilanlar", ilanId)

            await updateDoc(ilanRef, {
                onay: true,
                onayTarih: serverTimestamp()
            })

            toast.success(ilanId + " Kodlu ilan onaylandı.")
            setIlanData(prevIlanData => prevIlanData.filter(ilan => ilan.id !== ilanId))
        } catch (error) {
            toast.error("Sistemde bir sorun var")
            console.log(error);
        }
    }

    const handleImageClick = (image) => {
        const newWindow = window.open(image, "_blank");
        newWindow.focus();
      };
      
  return (
    <div className='duration-300  rounded-xl bg-zinc-100 container max-w-screen-lg w-full border p-5'>
        <p className='text-2xl font-semibold'>Onay Bekleyen İlanlar</p>
        <div className="grid grid-cols-1 gap-4">
          {ilanData.length > 0 ? (
            ilanData.map((ilan) => (
              <div
                key={ilan.id}
                className="border flex flex-col md:flex-row gap-5 rounded-lg shadow-lg bg-white p-4"
              >
                <div className="w-full md:w-1/3">
                {ilan.images && ilan.images.length > 0 && (
                    <div className="mt-2">
                      <div className="overflow-hidden" ref={viewportRef}>
                        <div className="flex gap-2">
                          {ilan.images.map((image, index) => (
                            <div key={index} className="min-w-[300px] relative">
                              <img
                                src={image}
                                alt={`İlan Görseli ${index + 1}`}
                                className="rounded cursor-pointer w-full h-full"
                                onClick={() => handleImageClick(image)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                <button onClick={() => handleIlanOnayla(ilan.id)} className='p-2  mt-2 w-full bg-lime-400 rounded-xl'>İlanı Onayla</button>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-800">
                    {ilan.unvan}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-3">
                    <p className="text-md font-semibold text-gray-700">
                      İletişim <br />
                      <span className="font-normal">{ilan.iletisim}</span>
                    </p>
                    <p className="text-md font-semibold text-gray-700">
                      Eşya <br />{" "}
                      <span className="font-normal">{ilan.esya}</span>
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
                    <p className="text-md col-span-3 font-semibold text-gray-700">
                      Açıklama <br />
                      <p className="font-normal  h-12 overflow-y-scroll">{ilan.ozellikler}</p>
                    </p>
                    <p className="text-md font-semibold text-gray-700">
                      Oluşturulma Tarihi <br />
                      <span className="font-normal">{ilan.creationDate}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">Henüz onay bekleyen ilan yok.</p>
          )}
        </div>
    </div>
  )
}

export default OnayBekleyenler