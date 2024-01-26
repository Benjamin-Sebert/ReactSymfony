// Sidebar.js
import React, { useRef, useEffect, useState }from 'react';
import { Home, Newspaper, View, FileImage, FileBarChart2, Palette, Mail } from 'lucide-react';
import { useTheme } from './ThemeContext';

const Sidebar = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <aside className={`w-full md:w-2/12 p-5 ${theme} md:shadow-lg`}>
      <ul className="space-y-4">

      <li>
          <a className="flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-md transition" href="lesarticles">
            <View className="text-white" size={30} />
            <span className="mx-4 font-medium">Afficher les articles</span>
          </a>
        </li>
        
        <li>
          <a className="flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-md transition" href="Creation_article">
            <Newspaper className="sidebar-icon" size={30} />
            <span className="mx-4 font-medium">Créer mon article</span>
          </a>
        </li>

        <li>
          <a className="flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-md transition" href="ajout_media">
            <FileImage className="sidebar-icon" size={30} />
            <span className="mx-4 font-medium">+ Images</span>
          </a>
        </li>

        <li>
          <a className="flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-md transition" href="ajout_csv">
            <FileBarChart2 className="sidebar-icon" size={30} />
            <span className="mx-4 font-medium">+ CSV</span>
          </a>
        </li>

        <li>
          <a className="flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-md transition" href="contact">
            <Mail className="sidebar-icon" size={30} />
            <span className="mx-4 font-medium">Contact</span>
          </a>
        </li>

        <li>
        <button
          className="flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-md transition"
          onClick={() => changeTheme('dark')}
        >
          <Palette className="sidebar-icon" size={30}  />
          <span className="mx-4 font-medium">Night mode</span>
        </button>
      </li>
      <li>
        <button
          className="flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-md transition"
          onClick={() => changeTheme('theme1')}
        >
          <Palette className="sidebar-icon" size={30} />
          <span className="mx-4 font-medium">Light Mode</span>
        </button>
      </li>
      <li>
        <button
          className="flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-md transition"
          onClick={() => changeTheme('theme2')}
        >
          <Palette className="sidebar-icon" size={30} />
          <span className="mx-4 font-medium">Forest Mode</span>
        </button>
      </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
