// assets/react/App.js
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Dashboard from './Dashboard'; 

const Index_Home = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="bg-white">
      <Dashboard />
      </div>
      <Footer />
    </div>
  );
};

export default Index_Home;