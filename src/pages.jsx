import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'


const Odeme = () => {
  const [gelenData, setGelenData] = useState({
    iban: "TR00000 00000 000",
    hesapNo: "5555 4000 1999 0000",
    banka: "Ziraat Bankası",
    sube: "Hüseyin Gazi",
    ucret: "1000"
  })

  useEffect(() => {
    // veriler firestoreden çekilecek
  }, [])

  return (
    <div>
      <Header />

      <div className='py-20'>
        <div className='container mx-auto max-w-screen-xl'>
          <div className='max-w-md rounded p-2 border mx-auto border-red-400 w-full'>
            <p className='text-red-500 font-bold text-xl'>UYARI !</p>
            <p className='text-xs text-black'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga asperiores sequi exercitationem nisi cumque unde totam nulla nesciunt, dicta explicabo adipisci eligendi, reiciendis in. Laudantium harum magnam incidunt voluptates error.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Odeme