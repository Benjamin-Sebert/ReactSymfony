import React, { useState, useEffect } from 'react';

import axios from 'axios';

const ThemeToggle = () => {
    const [currentTheme, setCurrentTheme] = useState('light');

    const toggleTheme = async () => {
        const response = await axios.post('/toggle-theme');
        setCurrentTheme(response.data.theme);
    };

    useEffect(() => {
        const fetchCurrentTheme = async () => {
            const response = await axios.get('/theme');
            setCurrentTheme(response.data.theme);
        };

        fetchCurrentTheme();
    }, []); // Le tableau vide [] garantit que cela se produit seulement au chargement initial

    useEffect(() => {
        document.body.classList.toggle('dark-theme', currentTheme === 'dark');
        document.body.classList.toggle('light-theme', currentTheme === 'light');
    }, [currentTheme]); // Exécutez cela à chaque changement de currentTheme

    return (
        <div>
            <button onClick={toggleTheme}>Toggle Theme</button>
            <p>Current Theme: {currentTheme}</p>
        </div>
    );
};

export default ThemeToggle;