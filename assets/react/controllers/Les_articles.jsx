import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import axios from 'axios';
import UserEmailFetcher from './UserEmailFetcher';
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

  const handleDelete = async (articleId) => {
    try {
      await axios.delete(`http://localhost:8000/api/articles/${articleId}`);

      const blockResponse = await axios.get('http://localhost:8000/api/blocs');

      const blocs = blockResponse.data['hydra:member'].filter(block => block.Idarticle === "" + articleId);

      for (const bloc of blocs) {
        await axios.delete(`http://localhost:8000/api/blocs/${bloc.id}`);
      }

      setArticles((prevArticles) => prevArticles.filter((article) => article.id !== articleId));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
    }
  };

  return (
    <div className={`w-full ${theme} md:shadow-lg`}>
      <div className="flex flex-col md:flex-row">
        <Sidebar />

        <main className="flex-1 p-6">
          <Navbar />

          <div className="mt-8">
            <h2 className="text-3xl font-semibold mb-4">Les articles disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.map((article) => (
                <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.titre}</h3>
                    <p className="text-gray-600">{article.resume}</p>
                    <div className="mt-4">
                      <p className="text-sm text-gray-700">Créateur: {article.createur}</p>
                      <a
                        className="block mt-2 px-4 py-2 bg-custom-blue text-white rounded-md hover:bg-blue-600 transition"
                        href={`articles/${article.id}`}
                      >
                        Voir plus
                      </a>
                      <div className="flex mt-2 space-x-2">
                        <a
                          className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 transition"
                          href={`articlesmodifs/${article.id}`}
                        >
                          Modifier
                        </a>
                        <button
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                          onClick={() => handleDelete(article.id)}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
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
