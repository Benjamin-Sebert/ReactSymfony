import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserEmailFetcher from './UserEmailFetcher'; // Assurez-vous d'ajuster le chemin du fichier si nécessaire

const AvatarButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userEmail = UserEmailFetcher();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button type="button" onClick={toggleMenu} className="flex items-center focus:outline-none">
        <svg
          className="w-6 h-6 text-gray-800 dark:text-custom-blue"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 18"
        >
          <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
        </svg>
        <span className="ml-2 text-gray-700">{userEmail}</span>
        <svg
          className="ml-2 w-4 h-4 text-gray-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg transition-transform transform scale-95 ${
          menuOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'
        }`}
      >
        <ul className="py-2">
          <li>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              Mon compte
            </a>
          </li>
          <li>
            <a href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              Déconnexion
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AvatarButton;
