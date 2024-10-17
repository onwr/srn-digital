import React from "react";

const Footer = () => {
  return (
    <div className="container mx-auto max-w-screen-xl mt-5 flex flex-col items-center justify-center py-5 px-4 border-t border-gray-200">
      <img
        src="/images/logo.png"
        alt="Logo"
        className="w-24 mb-4 h-auto p-1 bg-black rounded-xl"
      />
      <p className="text-gray-600">&copy; SRN Digital. Tüm hakları saklıdır</p>
    </div>
  );
};

export default Footer;
