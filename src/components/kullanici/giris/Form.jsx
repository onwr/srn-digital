import React, { useState } from "react";
import toast from "react-hot-toast";
import { db } from "../../../db/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [kulAd, setKulAd] = useState("");
  const [sifre, setSifre] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const kullaniciQuery = query(
        collection(db, "kullanicilar"),
        where("kulAd", "==", kulAd),
        where("sifre", "==", sifre)
      );
      const querySnapshot = await getDocs(kullaniciQuery);

      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data();

        if (user.hesapDurum === true) {
          Cookies.set("userUID", user.uid, { expires: 1 });
          Cookies.set("ad", user.kulAd, { expires: 1 });
          if (user.admin === true) {
            Cookies.set("admin", true, { expires: 1 });
          }
          toast.success("Giriş başarılı! Yönlendiriliyorsunuz...");
          navigate("/")
        }
        else {
          toast.error("Ödeme için gerekli adımları tamamlayınız. Tamamladıysanız üyeliğiniz kısa süre içerisinde aktif hale getirilecektir.");
          navigate("/odeme")
        }
      } else {
        toast.error("Kullanıcı adı veya şifre hatalı!");
      }
    } catch (error) {
      toast.error("Bir hata oluştu.");
      console.error("Hata:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-32 flex items-center justify-center">
      <div className="container mx-auto md:border md:bg-zinc-50 md:p-5 rounded max-w-screen-md mt-5">
        <p className="text-center font-bold text-2xl">ÜYELİK</p>
        <p className="text-center text-lg text-gray-500">Giriş Yap</p>
        <form
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col gap-2 items-center justify-center"
        >
          <input
            type="text"
            required
            value={kulAd}
            onChange={(e) => setKulAd(e.target.value)}
            autoFocus
            className="p-2 max-w-xs text-center duration-300 outline-none focus:ring-1 ring-lime-300 w-full border rounded-md"
            placeholder="Kullanıcı Adı"
          />
          <input
            type="password"
            required
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            className="p-2 max-w-xs text-center duration-300 outline-none focus:ring-1 ring-lime-300 w-full border rounded-md"
            placeholder="Şifre"
          />
          <button
            type="submit"
            className="mt-2 hover:bg-lime-400 duration-300 w-full max-w-xs border py-2 bg-lime-300 rounded-xl"
          >
            {loading ? "Bilgiler doğrulanıyor..." : "Giriş Yap"}
          </button>
          <a
            href="/kullanici/kayit"
            className="text-gray-400 text-sm font-medium underline"
          >
            Hesabım yok
          </a>
        </form>
      </div>
    </div>
  );
};

export default Form;
