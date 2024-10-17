import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { db } from "../db/Firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userUID = Cookies.get("userUID");

    const checkUser = async () => {
      if (!userUID) {
        navigate("/kullanici/giris");
        alert("İşlem yapabilmek için lütfen giriş yapınız.");
        return;
      }

      try {
        const userDoc = doc(db, "kullanicilar", userUID);
        const userSnapshot = await getDoc(userDoc);

        if (!userSnapshot.exists()) {
          navigate("/kullanici/giris");
          alert("İşlem yapabilmek için lütfen giriş yapınız.");
        }
      } catch (error) {
        console.error("Kullanıcı kontrol hatası:", error);
        alert("İşlem yapabilmek için lütfen giriş yapınız.");
        navigate("/kullanici/giris");
      }
    };

    checkUser();
  }, [navigate]);

  return <>{children}</>;
};

export default AuthLayout;
