import { ImagePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import iller from "../../helpers/il.json";
import { storage, db } from "../../db/Firebase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";

const Form = () => {
  const [uyariMetin, setUyariMetin] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    unvan: "",
    iletisim: "",
    esya: "",
    mevcutMiktar: "",
    miktarFiyati: "",
    gummruklu: "",
    bulunduguYer: "",
    bulunduguIl: "",
    menseUlke: "",
    ozellikler: "",
  });

  useEffect(() => {
    const metinCek = async () => {
      try {
        const docRef = doc(db, "odeme", "ilanuyari");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUyariMetin(docSnap.data().metin);
        }
      } catch (error) {
        console.log(error);
      }
    };

    metinCek();
  }, []);

  const illerListesi = Object.entries(iller).map(([key, value]) => ({
    id: key,
    ad: value,
  }));

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length > 4) {
      toast.error("En fazla 4 resim ekleyebilirsiniz.");
      return;
    }
    setImages((prev) => [...prev, ...files]);
  };

  const uploadImages = async () => {
    const imageUrls = [];
    for (const image of images) {
      const imageRef = ref(storage, `ilanlar/${image.name}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      imageUrls.push(url);
    }
    return imageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imageUrls = await uploadImages();
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()} ${getTurkishMonth(
        currentDate.getMonth()
      )} ${currentDate.getFullYear()}`;

      const newDocRef = await addDoc(collection(db, "ilanlar"), {
        ...formData,
        images: imageUrls,
        onay: false,
        creationDate: formattedDate,
      });

      toast.success("İlan oluşturuldu");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Bir hata oluştu");
      console.error("Hata oluştu:", error);
    }
  };

  const getTurkishMonth = (monthIndex) => {
    const months = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];
    return months[monthIndex];
  };

  return (
    <>
      <div className="container px-2 lg:px-0 max-w-screen-xl mx-auto my-10 flex flex-col lg:flex-row gap-5">
        <div className="lg:w-1/4">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="border hover:bg-zinc-100 duration-300 cursor-pointer flex items-center justify-center rounded-xl bg-zinc-50 py-20"
          >
            <ImagePlus className="size-16" />
          </label>
          <div className="flex flex-wrap mt-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                className="w-16 h-16 object-cover mr-2 mb-2 border rounded"
              />
            ))}
          </div>
          <div className="text-xs p-2 border rounded-xl mt-2">
            Eşyaya ait analiz belgesi var ise yüklemeniz geri dönüşlerinize
            katkı sağlayacaktır.
          </div>
        </div>
        <div className="flex-1 w-full border rounded-xl bg-zinc-50 p-4">
          <p className="text-xl font-medium">İlan Detayları</p>
          <form
            className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Ünvan"
              value={formData.unvan}
              onChange={(e) =>
                setFormData({ ...formData, unvan: e.target.value })
              }
              className="p-2 focus:ring-2 duration-300 ring-lime-100 bg-white border outline-none rounded"
            />
            <input
              type="text"
              placeholder="İletişim (Tel/Mail)"
              value={formData.iletisim}
              onChange={(e) =>
                setFormData({ ...formData, iletisim: e.target.value })
              }
              className="p-2 focus:ring-2 duration-300 ring-lime-100 bg-white border outline-none rounded"
            />
            <input
              type="text"
              placeholder="Eşya"
              value={formData.esya}
              onChange={(e) =>
                setFormData({ ...formData, esya: e.target.value })
              }
              className="p-2 focus:ring-2 duration-300 ring-lime-100 bg-white border outline-none rounded"
            />
            <input
              type="text"
              placeholder="Mevcut Miktar"
              value={formData.mevcutMiktar}
              onChange={(e) =>
                setFormData({ ...formData, mevcutMiktar: e.target.value })
              }
              className="p-2 focus:ring-2 duration-300 ring-lime-100 bg-white border outline-none rounded"
            />
            <input
              type="text"
              placeholder="Miktar Fiyatı"
              value={formData.miktarFiyati}
              onChange={(e) =>
                setFormData({ ...formData, miktarFiyati: e.target.value })
              }
              className="p-2 focus:ring-2 duration-300 ring-lime-100 bg-white border outline-none rounded"
            />
            <select
              value={formData.gummruklu}
              onChange={(e) =>
                setFormData({ ...formData, gummruklu: e.target.value })
              }
              className="p-2 focus:ring-2 duration-300 ring-lime-100 bg-white border outline-none rounded"
            >
              <option value="" disabled>
                Eşya Gümrüklü Mü?
              </option>
              <option value="evet">Evet</option>
              <option value="hayir">Hayır</option>
            </select>
            <select
              value={formData.bulunduguYer}
              onChange={(e) =>
                setFormData({ ...formData, bulunduguYer: e.target.value })
              }
              className="p-2 focus:ring-2 duration-300 ring-lime-100 bg-white border outline-none rounded"
            >
              <option value="" disabled>
                Eşyanın Bulunduğu Yer
              </option>
              <option value="antrepo">Antrepo</option>
              <option value="depo">Depo</option>
              <option value="gecici-depolama">Geçici Depolama</option>
            </select>
            <select
              value={formData.bulunduguIl}
              onChange={(e) =>
                setFormData({ ...formData, bulunduguIl: e.target.value })
              }
              className="p-2 focus:ring-2 duration-300 ring-lime-100 bg-white border outline-none rounded"
            >
              <option value="" disabled>
                Eşyanın Bulunduğu İl
              </option>
              {illerListesi.map((il) => (
                <option key={il.id} value={il.id}>
                  {il.ad}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Menşe Ülke"
              value={formData.menseUlke}
              onChange={(e) =>
                setFormData({ ...formData, menseUlke: e.target.value })
              }
              className="p-2 focus:ring-2 duration-300 ring-lime-100 bg-white border outline-none rounded"
            />
            <textarea
              maxLength={170}
              placeholder="Eşya Özellikleri"
              value={formData.ozellikler}
              onChange={(e) =>
                setFormData({ ...formData, ozellikler: e.target.value })
              }
              className="p-2 h-24 focus:ring-2 duration-300 ring-lime-100 bg-white border outline-none rounded"
            />
            <div className="col-span-full flex justify-center mt-3">
              <button
                type="submit"
                disabled={loading}
                className="bg-lime-500 rounded-full p-2 w-full md:w-1/2 text-white hover:bg-lime-600 duration-300"
              >
                {loading ? "Oluşturuluyor.." : "İlan Oluştur"}
              </button>
            </div>
          </form>
          <p className="text-sm text-red-500 mt-2">{uyariMetin}</p>
        </div>
      </div>
    </>
  );
};

export default Form;
