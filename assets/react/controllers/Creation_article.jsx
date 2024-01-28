import React, { useRef, useEffect, useState } from 'react';
import ArticleBlock from './Bloc_article';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

import { useTheme, ThemeProvider } from './ThemeContext';

const AvCreation = ({ Crea }) => {
  return (
    <ThemeProvider>
      <ArticleForm Crea={Crea} />
    </ThemeProvider>
  );
};

const ArticleForm = ({ Crea }) => {
  const { theme } = useTheme();

  let articleId = "";
  const [article, setArticle] = useState({
    Titre: '',
    Resume: '',
    blocks: [],
  });
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const addBlock = () => {
    setArticle((prevArticle) => ({
      ...prevArticle,
      blocks: [...prevArticle.blocks, { type: 'default', data: { Titre: '', Texte: '' } }],
    }));
  };

  const updateBlock = (index, updatedBlock) => {
    setArticle((prevArticle) => {
      const updatedBlocks = [...prevArticle.blocks];
      updatedBlocks[index] = updatedBlock;
      return { ...prevArticle, blocks: updatedBlocks };
    });
  };

  const removeBlock = (index) => {
    setArticle((prevArticle) => {
      const updatedBlocks = [...prevArticle.blocks];
      updatedBlocks.splice(index, 1);
      return { ...prevArticle, blocks: updatedBlocks };
    });
  };

  const submitBlocksToServer = async (article) => {
    try {

      const blocData = article.blocks.map((block, index) => {
        const formData = new FormData();

        formData.append('Titre', block.Titre);
        formData.append('Texte', block.Texte);
        formData.append('id_article', articleId);
        formData.append('position_bloc', index);
        formData.append('Urlimg', block.imagePath);
        formData.append('Urlcsv', block.csvPath);
        formData.append('Colonne', block.Colonne);

        return formData;
      });

      await Promise.all(
        blocData.map(async (formData) => {
          try {
            const response = await fetch('http://localhost:8000/api/blocs', {
              method: 'POST',
              body: formData,
            });

            const data = await response.json();
            console.log('Bloc uploaded successfully:', data);

          } catch (error) {
            console.error('Error uploading block:', error);
          }
        })
      );
    } catch (error) {
      console.error('Erreur lors de l\'envoi des blocs:', error);
    }
  };

  const handleArticleSubmit = async () => {
    try {
      const articleData = {
        Titre: article.Titre,
        Resume: article.Resume,
        Createur: Crea,
      };
      const jsonData_article = JSON.stringify(articleData);

      const response_article = await fetch('http://localhost:8000/api/articles', {
        method: 'POST',
        headers: {
          'Accept': 'application/ld+json',
          'Content-Type': 'application/ld+json'
        },
        body: jsonData_article,
      });

      console.log(jsonData_article);

      const responseData = await response_article.json();
      console.log('Réponse du serveur:', responseData);
      const idArray = responseData['@id'].split('/api/articles/');
      articleId = idArray[1];

      console.log(articleId);
      await submitBlocksToServer(article);

      setConfirmationMessage('Article créé avec succès!');
      setErrorMessage(null);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'article:', error);
      setErrorMessage('Erreur lors de la création de l\'article.');
      setConfirmationMessage(null);
    }
  };

  return (
    <div className={`w-screen ${theme} md:shadow-lg`}>
      <div className="min-h-screen flex">

        <Sidebar />

        <main className="flex-1 p-6">
          <Navbar />
          <div className="mx-auto mt-8">
            <form className="max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold mb-8">Création d'article</h1>
              <div className="mb-6">
                <label htmlFor="Titre" className="block text-xl font-medium ">
                  Titre de l'article
                </label>
                <input
                  type="text"
                  id="Titre"
                  name="Titre"
                  value={article.Titre}
                  onChange={(e) => setArticle({ ...article, Titre: e.target.value })}
                  className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                  style={{ color: 'black' }}
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="Resume" className="block text-xl font-medium ">
                  Résumé de l'article
                </label>
                <textarea
                  id="Resume"
                  name="Resume"
                  value={article.Resume}
                  onChange={(e) => setArticle({ ...article, Resume: e.target.value })}
                  className="mt-1 p-3 border rounded-md w-full h-32 focus:outline-none focus:ring focus:border-blue-300"
                  style={{ color: 'black' }}
                  required
                ></textarea>
              </div>

              {article.blocks.map((block, index) => (
                <ArticleBlock
                  key={index}
                  index={index}
                  block={block}
                  updateBlock={updateBlock}
                  removeBlock={removeBlock}
                />
              ))}

              <button
                type="button"
                onClick={addBlock}
                className="bg-custom-blue	text-white px-4 py-2 rounded-md mr-4 focus:outline-none focus:ring focus:border-black-300"
              >
                Ajouter un bloc
              </button>
              <button
                type="button"
                onClick={handleArticleSubmit}
                className="bg-custom-blue text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-black-300"
              >
                Créer l'article
              </button>
              {confirmationMessage && (
                <div className="mt-4 text-custom-blue">{confirmationMessage}</div>
              )}
              {errorMessage && (
                <div className="mt-4 text-red-500">{errorMessage}</div>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AvCreation;