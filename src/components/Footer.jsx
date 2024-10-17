import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../db/Firebase";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const [donenData, setDonenData] = useState({});

  useEffect(() => {
    const veriCek = async () => {
      try {
        const docRef = doc(db, "odeme", "iletisim");
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          setDonenData(snap.data());
        }
      } catch (error) {
        console.log(error);
      }
    };
    veriCek();
  }, []);

  return (
    <footer class="bg-white dark:bg-gray-900">
      <div class="mx-auto w-full border-t max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex items-center md:justify-between">
          <div class="mb-6 md:mb-0">
            <a href="/" class="flex items-center">
              <img src="/images/logo.png" class="w-40 rounded-xl h-auto me-3" />
            </a>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Hızlı Menü
              </h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                  <a href="/" class="hover:underline">
                    Anasayfa
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/amac" class="hover:underline">
                    Kullanım Amacı
                  </a>
                </li>
                <li>
                  <a href="/kullanici/kayit" class="hover:underline">
                    Üye Ol
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Yasal
              </h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                  <a href="/gizlilik" class="hover:underline ">
                    Gizlilik
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/kvkk" class="hover:underline">
                    Kullanım Koşulları
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/cerez" class="hover:underline">
                    Çerez Politikası
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                İletişim
              </h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                  <a class="hover:underline flex items-center gap-1">
                    <Phone className="size-4" />
                    {donenData.tel}
                  </a>
                </li>
                <li class="mb-4">
                  <a class="hover:underline flex items-center gap-1">
                    <Mail className="size-4" />
                    {donenData.mail}
                  </a>
                </li>
                <li>
                  <a class="hover:underline flex items-center gap-1">
                    <MapPin className="size-4" />
                    {donenData.adres}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <p class="text-sm text-center text-gray-500 sm:text-center dark:text-gray-400">
          © D-STAND Tüm Hakları Saklıdır. Web design{" "}
          <a href="https://srndijital.com" className="underline">
            SRN Dijital
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
