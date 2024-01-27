import React from 'react';
import { ThemeProvider } from './ThemeContext';

const Accueil = (props) => {
    return (
        <ThemeProvider>
            <div className="w-screen h-screen bg-black">
                <div className="flex flex-col md:flex-row h-screen">
                    <main className="flex-1 p-6 overflow-y-auto">
                        <div className="flex-1 flex flex-col items-center justify-center p-6 h-full">
                            <div className="w-full max-w-4xl mx-auto bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-xl p-10">
                                <h1 className="text-5xl md:text-7xl font-bold text-custom-blue mb-6">
                                    Bienvenue sur Stare It!
                                </h1>
                                <p className="text-lg md:text-2xl text-gray-100 mb-8">
                                    Votre solution innovante pour créer et visualiser des articles avec des données interactives.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <a className="bg-white text-custom-blue font-bold py-3 px-6 rounded hover:shadow-lg transition duration-300 ease-in-out" href="/register">
                                        Inscription
                                    </a>
                                    <a className="bg-white text-custom-blue font-bold py-3 px-6 rounded hover:shadow-lg transition duration-300 ease-in-out" href="/login">
                                        Connexion
                                    </a>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Accueil;
