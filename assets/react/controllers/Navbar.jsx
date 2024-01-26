import React from 'react';
import { useTheme } from './ThemeContext';
import AvatarButton from './Avatar';
import ThreeScene from './ThreeScene';

const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div className={` ${theme === 'dark' ? 'navbar-dark' : theme === 'theme1' ? 'navbar-theme1' : 'navbar-theme2'} flex items-center justify-between border-b border-custom-black pb-4`}>
          <ThreeScene />
      <div className="flex items-center space-x-4">
        <AvatarButton />
      </div>
    </div>
  );
};

export default Navbar;
