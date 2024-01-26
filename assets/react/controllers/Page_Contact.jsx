// Page_Contact.jsx
import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';  // Assurez-vous que le chemin d'importation est correct
import ContactForm from './ContactForm';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AvCreation = () => {
  return (
    <ThemeProvider>
      <AvCreationContent />
    </ThemeProvider>
  );
};

const AvCreationContent = () => {
  const { theme } = useTheme();  // Assurez-vous que useTheme est correctement importé

  return (
    <div className={`w-screen h-screen ${theme} `}>
    
      <div className="flex flex-col md:flex-row h-screen">
        <Sidebar />
        <main className={`flex-1 p-6 ${theme} md:shadow-lg`}>
          <Navbar />
          <div className={` ${theme} flex justify-center items-center `}>
            <ContactForm />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AvCreation;
