import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import axios from 'axios';
import UserEmailFetcher from './UserEmailFetcher'; // Assurez-vous d'ajuster le chemin du fichier si nécessaire
import { useTheme, ThemeProvider } from './ThemeContext';


const AvCreation = () => {
    return (
      <ThemeProvider>
        <Article />
      </ThemeProvider>
    );
  };
const Article = (props) => {
    const { theme } = useTheme();
    const userEmail = UserEmailFetcher();
    const [resourceName, setResourceName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const csvResponse = await axios.get('http://localhost:8000/api/articles');
                setArticles(csvResponse.data['hydra:member']);
                console.log(csvResponse);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={`w-screen h-screen ${theme} md:shadow-lg`}>
            <div className="flex flex-col md:flex-row h-screen">
            
                    <Sidebar />
                        
                <main className="flex-1 p-6">
                    <Navbar />

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Les articles disponibles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {articles.map((article) => (
                                <div key={article.id} className="p-4 rounded-md shadow-md">
                                    <p>Titre: {article.titre}</p>
                                    <p>Résumé: {article.resume}</p>
                                    <p>Créateur: {article.createur}</p>
                                    <a 
                                        className="flex items-center justify-center bg-blue-500 text-white hover:bg-blue-700 rounded-md transition mt-2 p-2"
                                        href={`articles/${article.id}`}
                                    >
                                        Voir plus
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AvCreation;
