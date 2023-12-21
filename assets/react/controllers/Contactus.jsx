// ContactUs.jsx

import React from 'react';

const Contactus = () => {
  return (
    <div className="flex-col flex bg-custom-black p-8 rounded shadow-md w-full">
      <h3 className="text-4xl font-bold mb-4 text-white">Contactez nous</h3>
      <form action="#" method="post" className="message">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-white">Nom</label>
          <input type="text" className="border rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-white">Prénom</label>
          <input type="text" className="border rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-white">Email</label>
          <input type="text" className="border rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-white">Votre message</label>
          <textarea className="border rounded w-full py-2 px-3"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Envoyer le message
        </button>
      </form>
    </div>
  );
};

export default Contactus;
