import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/articles');
        setArticles(response.data['hydra:member']);
        console.log('Articles:', response.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Liste des articles</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <li key={article['@id']} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Titre: {article.titre || article.Titre}</h2>
            <p className="text-gray-600 mb-2">Résumé: {article.resume || article.Resume}</p>
            <p className="text-gray-700">Créateur: {article.createur || article.Createur}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
