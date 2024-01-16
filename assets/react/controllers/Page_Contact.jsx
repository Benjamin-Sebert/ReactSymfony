import React from 'react';
import ContactForm from './ContactForm';
import AvatarButton from './Avatar';
import ThemeToggle from './ThemeToggle';
import Sidebar from './Sidebar';

const avcreation = () => {
  return (

  <div className="w-screen h-screen">
    <div className="flex flex-col md:flex-row h-screen">
        <Sidebar />
        
        <main className="flex-1 p-6">
            <div className="flex items-center justify-between border-b border-custom-black pb-4">
                <h1 className="font-bold text-black">Stare<span className="font-bold text-custom-red">It</span></h1>
                <div className="flex items-center space-x-4">

                    <AvatarButton />
                    <ThemeToggle />
                    
                   
                </div>
                
            </div>

            <div className="gap-8 mt-6">
            <ContactForm />
            </div>
        </main>
    </div>
  </div>

   
  );
  };

export default avcreation;



