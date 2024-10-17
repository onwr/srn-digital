import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { db } from "../db/Firebase";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userUID = Cookies.get("userUID");

    const checkUser = async () => {
      if (!userUID) {
        navigate("/kullanici/giris");
        return;
      }

      try {
        const userDoc = doc(db, "kullanicilar", userUID);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
            const data = userSnapshot.data();
            if (data.admin) {
                navigate("/admin");
            } else {
                navigate("/kullanici/giris");
                toast.error("Yetkiniz bulunmuyor...")
            }
        } else {
          navigate("/kullanici/giris");
          toast.error("Kullanıcı bulunamadı.")
        }
      } catch (error) {
        console.error("Kullanıcı kontrol hatası:", error);
        toast.error("Yetkiniz bulunmuyor.")
        navigate("/kullanici/giris");
      }
    };

    checkUser();
  }, [navigate]);

  return <>{children}</>;
};

export default AdminLayout;
