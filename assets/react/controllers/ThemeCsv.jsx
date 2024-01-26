// Page_Contact.jsx
import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';  
import Ajout_csv from './Ajout_csv';
import Sidebar from './Sidebar';
import Navbar from './Navbar';



const AvCreation = () => {
  const { theme } = useTheme();  // Assurez-vous que useTheme est correctement importé

  return (
    <ThemeProvider>
    <div className={`w-screen h-screen ${theme === 'dark' ? 'bg-gray-800' : theme === 'theme1' ? 'bg-blue-500' : 'bg-green-500'}`}>
      <div className="flex flex-col md:flex-row h-screen">
        <Sidebar />
        <main className={`flex-1 p-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          <Navbar />
          <div className={`gap-8 mt-6 ${theme === 'dark' ? 'bg-gray-800' : theme === 'theme1' ? 'bg-blue-500' : 'bg-green-500'}`}>
            <Ajout_csv />
          </div>
        </main>
      </div>
    </div>
    </ThemeProvider>
  );
};

export default AvCreation;
