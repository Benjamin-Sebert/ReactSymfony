// assets/react/App.js
import React from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Dashboard from './Dashboard'; // Assurez-vous que le chemin d'accès est correct




const Index_Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div><a-assets> <a-asset-item id="heart" src="beating-heart.glb"></a-asset-item> </a-assets></div>
      <Sidebar />
      <div className="bg-white">
      <Dashboard />
      </div>
      <Footer />
    </div>
  );
};

export default Index_Home;