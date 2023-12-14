// Sidebar.js
import React, { useState } from 'react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Bouton pour déployer la Sidebar */}
            <button onClick={() => setIsOpen(!isOpen)} className="fixed top-0 left-0 z-30 m-4 text-black bg-custom-green p-2 rounded-md focus:outline-none">
                {isOpen ? 'Close' : 'Menu'}
            </button>

            {/* Sidebar */}
            <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed top-0 left-0 z-20 h-full w-64 overflow-y-auto bg-custom-black p-4 transition-transform duration-300 ease-in-out`}>
                {/* Contenu de la Sidebar */}

                <br />
                <br />

                <div class="w-full max-w-sm bg-custom-green border border-gray-200 rounded-lg shadow dark:border-gray-700">
                    <div class="flex flex-col items-center">
                        <h5 class="mb-1 text-xl font-medium text-custom-blue">Benjamin Sebert</h5>
                        <span class="text-sm text-custom-blue">benjaminsebert@cms.com</span>
                    </div>
                </div>

                <br />
                <br />


                <a href="/" className="text-white block py-2 px-4">Home</a>
                <a href="/about" className="text-white block py-2 px-4">Thèmes</a>
                <a href="/contact" className="text-white block py-2 px-4">Contact</a>
                <a href="/contact" className="text-white block py-2 px-4">Deconnexion</a>

                {/* Ajoutez d'autres liens si nécessaire */}
            </div>

            {/* Overlay quand la Sidebar est ouverte */}
            {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-10 bg-black opacity-50"></div>}
        </div>
    );
};

export default Sidebar;