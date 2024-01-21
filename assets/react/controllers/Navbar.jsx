// Footer.js
import React from 'react';
import AvatarButton from './Avatar';
import ThemeToggle from './ThemeToggle';
import ThreeScene from './ThreeScene';

const Navbar = () => {
    return (
        <div className="flex items-center justify-between border-b border-custom-black pb-4">
            <ThreeScene />
            <div className="flex items-center space-x-4">
                <AvatarButton />
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Navbar;