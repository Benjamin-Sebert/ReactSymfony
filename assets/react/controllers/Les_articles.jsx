import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import axios from 'axios';
import UserEmailFetcher from './UserEmailFetcher'; // Assurez-vous d'ajuster le chemin du fichier si nécessaire

const article = (props) => {
    const userEmail = UserEmailFetcher();
    const [resourceName, setResourceName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [articles, setarticles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const csvResponse = await axios.get('http://localhost:8000/api/articles');
                setarticles(csvResponse.data['hydra:member']);
                console.log(csvResponse);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-screen h-screen">
            <div className="flex flex-col md:flex-row h-screen">
                <Sidebar />
                <main className="flex-1 p-6">
                    <Navbar/>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Ressources CSV disponibles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {articles.map((article) => (
                                <div key={article.id} className="p-4 bg-white rounded-md shadow-md">
                                    <p className="text-gray-700 font-semibold">titre : {article.titre}</p>
                                    <p className="text-gray-600">resume : {article.resume}</p>
                                    <p className="text-gray-600">createur : {article.createur}</p>
                                    <a className="flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-md transition" href={`articles/${article.id}`}></a>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default article;
