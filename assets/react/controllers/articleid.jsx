import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ChartComponent from './Chart';
import { ThemeProvider, useTheme } from './ThemeContext';

const ArticleInfo = ({ article, blocs }) => (
  <div className="bg-transparent py-12 px-4 sm:px-6 lg:px-8 rounded-lg">
    <div className="w-full">
      <div className="px-6 py-8">
        <h2 className="text-4xl font-semibold text-white mb-8">Article</h2>

        <div className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem label="Titre" value={article.Titre} />
            <InfoItem label="Résumé" value={article.Resume} />
            <InfoItem label="Créé par" value={article.Createur} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blocs.map((bloc) => (
            <BlocItem key={bloc.id} bloc={bloc} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const InfoItem = ({ label, value }) => (
  <div className="mb-4">
    <strong className="">{label} :</strong> {value}
  </div>
);

const BlocItem = ({ bloc }) => (
  <div className="mb-2 bg-white text-black p-2 rounded-lg shadow-md">
    <h2 className="text-3xl font-bold mb-4">{bloc.Titre}</h2>
    {bloc.Urlimg && (
      <img
        className="mb-4 max-w-full h-auto border-double border-4 border-black rounded-lg"
        src={`/images/${bloc.Urlimg}`}
        alt="Description de l'image"
      />
    )}
    <p className="mb-4">{bloc.Texte}</p>
    <ChartComponent csvUrl={`/csv/${bloc.Urlcsv}`} colonne={bloc.Colonne} className="w-full max-w-full" />
  </div>
);

const ArticleIdComponent = ({ id }) => {
  const [article, setArticle] = useState({});
  const [blocs, setBlocs] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleResponse = await axios.get(`http://localhost:8000/api/articles/${id}`);
        setArticle(articleResponse.data);

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
    <div className={`w-full h-full ${theme} md:shadow-lg`}>
      <div className="flex flex-col md:flex-row">

        <Sidebar />

        <main className="flex-1 p-6">
          <Navbar />

          <div className={`mt-8 ${theme}`}>
            <ArticleInfo article={article} blocs={blocs} />
          </div>
        </main>
      </div>

    </div>
  );
};
const AvCreation = ({ id, theme }) => {
  return (
    <ThemeProvider>
      <ArticleIdComponent id={id} />
    </ThemeProvider>
  );
};

export default AvCreation;
