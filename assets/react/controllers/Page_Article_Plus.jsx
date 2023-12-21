import React from 'react';
import Article_Visualisation_Creation from './Article_Visualisation_Creation';

const avcreation = () => {
  return (
    <div className="w-screen h-screen">
    <div className="flex flex-col md:flex-row h-screen">
      <aside className="w-full md:w-2/12 bg-blue-600 p-4 shadow-xl md:shadow-none">
        <ul className="space-y-2 text-white">
          <li><a href="#" className="block font-semibold hover:underline">Accueil</a></li>
          <li><a href="#" className="block font-semibold hover:underline">Backpacks</a></li>
          <li><a href="#" className="block font-semibold hover:underline">Travel Bags</a></li>
          <li><a href="#" className="block font-semibold hover:underline">Hip Bags</a></li>
          <li><a href="#" className="block font-semibold hover:underline">Laptop Sleeves</a></li>
        </ul>
      </aside>

      <main className="flex-1 bg-gray-100 p-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-800">SASCMS</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800">Mon compte</button>
            <button className="text-gray-600 hover:text-gray-800">Deconnexion</button>
          </div>
        </div>

        <div className="gap-8 mt-6">
          <Article_Visualisation_Creation />
        </div>
      </main>
    </div>
    </div>
  );
};

export default avcreation;
