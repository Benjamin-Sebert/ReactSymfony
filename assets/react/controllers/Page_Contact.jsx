import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import ContactForm from './ContactForm';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AvCreation = ({ email }) => {
  console.log(email);

  return (
    <ThemeProvider>
      <AvCreationContent email={email} />
    </ThemeProvider>
  );
};

const AvCreationContent = ({ email }) => {
  const { theme } = useTheme();
  console.log(email);
  return (
    <div className={`w-screen h-screen ${theme} `}>

      <div className="flex flex-col md:flex-row h-screen">
        <Sidebar />
        <main className={`flex-1 p-6 ${theme} md:shadow-lg`}>
          <Navbar />
          <div className={` ${theme} flex justify-center items-center `}>
            <ContactForm email={email} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AvCreation;
