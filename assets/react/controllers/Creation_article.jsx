// ArticleForm.js
import React, { useRef, useEffect, useState } from 'react';
import ArticleBlock from './Bloc_article';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

import { useTheme, ThemeProvider } from './ThemeContext';


const AvCreation = () => {
    return (
      <ThemeProvider>
        <ArticleForm />
      </ThemeProvider>
    );
  };

const ArticleForm = () => {
  const { theme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState('default'); // Default theme
  const themeKey = 'selectedTheme';

  useEffect(() => {
    // Retrieve the theme from localStorage on component mount
    const storedTheme = localStorage.getItem(themeKey);
    if (storedTheme) {
      setSelectedTheme(storedTheme);
    }
  }, []);

  const changeTheme = (theme) => {
    setSelectedTheme(theme);
    // Save the selected theme to localStorage
    localStorage.setItem(themeKey, theme);
  };

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

        formData.append('Titre', block.Titre);  // Correction ici
        formData.append('Texte', block.Texte);  // Correction ici
        formData.append('id_article', articleId);
        formData.append('position_bloc', index);
        formData.append('Urlimg', block.imagePath);  // Correction ici
        formData.append('Urlcsv', block.csvPath);  // Correction ici

        return formData; // Retourner l'objet FormData dans chaque itération
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
        Createur: "test",
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

      // Set confirmation message
      setConfirmationMessage('Article créé avec succès!');
      // Reset error message
      setErrorMessage(null);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'article:', error);
      // Set error message
      setErrorMessage('Erreur lors de la création de l\'article.');
      // Reset confirmation message
      setConfirmationMessage(null);
    }
  };
  return (
    <div className={`w-screen h-screen ${theme === 'dark' ? 'bg-gray-800' : theme === 'theme1' ? 'bg-blue-500' : 'bg-green-500'} md:shadow-lg`}>
    <div className="min-h-screen flex">
      {/* Sidebar */}
      

      <Sidebar/>

      

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Navbar */}
        <Navbar />
        {/* Article Creation Form */}
        <div className="container mx-auto mt-8">
          <form className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Création d'article</h1>
            {/* Article Title */}
            <div className="mb-6">
              <label htmlFor="Titre" className="block text-sm font-medium ">
                Titre de l'article
              </label>
              <input
                type="text"
                id="Titre"
                name="Titre"
                value={article.Titre}
                onChange={(e) => setArticle({ ...article, Titre: e.target.value })}
                className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            {/* Article Summary */}
            <div className="mb-6">
              <label htmlFor="Resume" className="block text-sm font-medium ">
                Résumé de l'article
              </label>
              <textarea
                id="Resume"
                name="Resume"
                value={article.Resume}
                onChange={(e) => setArticle({ ...article, Resume: e.target.value })}
                className="mt-1 p-3 border rounded-md w-full h-32 focus:outline-none focus:ring focus:border-blue-300"
                required
              ></textarea>
            </div>

            {/* Article Blocks */}
            {article.blocks.map((block, index) => (
              <ArticleBlock
                key={index}
                index={index}
                block={block}
                updateBlock={updateBlock}
                removeBlock={removeBlock}
              />
            ))}

            {/* Add Block Button */}
            <button
              type="button"
              onClick={addBlock}
              className="bg-red-400	 text-white px-4 py-2 rounded-md mr-4 hover:bg-red-600 focus:outline-none focus:ring focus:border-black-300"
            >
              Ajouter un bloc
            </button>
            <button
              type="button"
              onClick={handleArticleSubmit}
              className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-black-300"
            >
              Créer l'article
            </button>
            {/* Confirmation Message */}
            {confirmationMessage && (
              <div className="mt-4 text-green-500">{confirmationMessage}</div>
            )}
            {/* Error Message */}
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