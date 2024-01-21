import React from 'react';
import ContactForm from './ContactForm';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const avcreation = () => {
  return (

    <div className="w-screen h-screen">
      <div className="flex flex-col md:flex-row h-screen">
        <Sidebar />

        <main className="flex-1 p-6">

          <Navbar />

          <div className="gap-8 mt-6">
            <ContactForm />
          </div>
        </main>
      </div>
    </div>


  );
};

export default avcreation;



