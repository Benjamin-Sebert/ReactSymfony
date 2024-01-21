import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import UserEmailFetcher from './UserEmailFetcher';
import ChartComponent from './Chart';

const ArticleInfo = ({ article }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-8">
    <h2 className="text-2xl font-bold mb-4">Article :</h2>
    <ul>
      <li className="mb-2">
        <strong>Titre:</strong> {article.Titre}
      </li>
      <li className="mb-2">
        <strong>Résumé:</strong> {article.Resume}
      </li>
      <li>
        <strong>Créé par :</strong> {article.Createur}
      </li>
    </ul>
  </div>
);

const BlocItem = ({ bloc }) => (
  <li key={bloc.id} className="mb-8 bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-bold mb-4">{bloc.Titre}</h3>
    {bloc.Urlimg && (
      <img className="mb-4 max-w-full h-auto" src={`/media/${bloc.Urlimg}`} alt="Description de l'image" />
    )}
    <p className="mb-4">{bloc.Texte}</p>
    <ChartComponent csvUrl={`/csv/${bloc.Urlcsv}`} className="w-full max-w-full" />
  </li>
);

const ArticleIdComponent = ({ id }) => {
  const userEmail = UserEmailFetcher();
  const [article, setArticle] = useState({});
  const [blocs, setBlocs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch article data
        const articleResponse = await axios.get(`http://localhost:8000/api/articles/${id}`);
        setArticle(articleResponse.data);

        // Fetch block data
        const blockResponse = await axios.get('http://localhost:8000/api/blocs');
        const matchingBlocks = blockResponse.data['hydra:member'].filter(block => block.Idarticle === id);

        if (matchingBlocks.length > 0) {
          setBlocs(matchingBlocks);
        } else {
          console.warn('No matching blocks found for the article ID:', id);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <Navbar />
        <div className="mt-8">
          <ArticleInfo article={article} />
          <div>
            <h2 className="text-2xl font-bold mb-4">Blocs :</h2>
            <ul>{blocs.map((bloc) => <BlocItem key={bloc.id} bloc={bloc} />)}</ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticleIdComponent;
