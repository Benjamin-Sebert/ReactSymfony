import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import UserEmailFetcher from './UserEmailFetcher';

const Themes = (props) => {
    const userEmail = UserEmailFetcher();
    const [selectedTheme, setSelectedTheme] = useState('default');

    const themes = {
        default: {
            background: 'bg-white',
            text: 'text-gray-800',
            card: 'bg-blue-200',
        },
        theme1: {
            background: 'bg-gray-800',
            text: 'text-white',
            card: 'bg-red-500',
        },
        theme2: {
            background: 'bg-green-200',
            text: 'text-gray-800',
            card: 'bg-yellow-300',
        },
    };

    const changeTheme = (theme) => {
        setSelectedTheme(theme);
    };

    useEffect(() => {
        // Apply theme styles to the body or any specific elements as needed
        document.body.className = themes[selectedTheme].background + ' ' + themes[selectedTheme].text;
    }, [selectedTheme]);

    return (
        <div className={`w-screen h-screen ${themes[selectedTheme].background} ${themes[selectedTheme].text}`}>
            <div className="flex flex-col md:flex-row h-screen">
                <Sidebar />
                <main className={`flex-1 p-6 ${themes[selectedTheme].text}`}>
                    <Navbar />

                    <div className="gap-8 mt-6">
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-full">
                                <div className={`mb-6 ${themes[selectedTheme].card}`}>
                                    <h1 className="text-2xl font-semibold mb-2">Changer le thème du site</h1>
                                    <div>
                                        <p>Choisissez un thème:</p>
                                        <button onClick={() => changeTheme('default')} className="px-4 py-2 mx-2 bg-gray-200 hover:bg-gray-300">Thème par défaut</button>
                                        <button onClick={() => changeTheme('theme1')} className="px-4 py-2 mx-2 bg-gray-200 hover:bg-gray-300">Thème 1</button>
                                        <button onClick={() => changeTheme('theme2')} className="px-4 py-2 mx-2 bg-gray-200 hover:bg-gray-300">Thème 2</button>
                                        {/* Add more theme buttons as needed */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Themes;
