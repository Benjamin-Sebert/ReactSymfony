import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { ThemeProvider, useTheme } from './ThemeContext';
import axios from 'axios';

const BlocItem = ({ bloc, onBlocChange, blocFormData }) => {
  return (
    <li className="mb-2 bg-white text-black p-2 rounded-lg shadow-md">
      <label htmlFor={`titre-${bloc.id}`} className="block font-bold">
        Titre actuel du bloc : {bloc.Titre}
      </label>
      <input
        type="text"
        id={`titre-${bloc.id}`}
        name="titre"
        value={blocFormData.titre}
        onChange={(e) => onBlocChange(bloc.id, e)}
        className="border border-gray-400 p-2 rounded-md w-full"
      />
      <label htmlFor={`texte-${bloc.id}`} className="block font-bold">
        Texte actuel du bloc : {bloc.Texte}
      </label>
      <input
        type="text"
        id={`texte-${bloc.id}`}
        name="texte"
        value={blocFormData.texte}
        onChange={(e) => onBlocChange(bloc.id, e)}
        className="border border-gray-400 p-2 rounded-md w-full"
      />
    </li>
  );
};

function UpdateArticleForm({ id }) {
  const { theme } = useTheme();
  const [blocs, setBlocs] = useState([]);
  const [formData, setFormData] = useState({ titre: '', resume: '', createur: '' });
  const [blocFormDatas, setBlocFormDatas] = useState({});
  const [messageConfirmation, setMessageConfirmation] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/articles/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => console.error('Erreur lors de la récupération des données :', error));
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/blocs');
        const matchingBlocks = response.data['hydra:member'].filter(block => block.Idarticle === id);

        if (matchingBlocks.length > 0) {
          setBlocs(matchingBlocks);
          const initialBlocDatas = {};
          matchingBlocks.forEach(block => {
            initialBlocDatas[block.id] = { ...block };
          });
          setBlocFormDatas(initialBlocDatas);
        } else {
          console.warn('No matching blocks found for the article ID:', id);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des blocs :', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlocChange = (blocId, e) => {
    setBlocFormDatas({
      ...blocFormDatas,
      [blocId]: {
        ...blocFormDatas[blocId],
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:8000/api/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify(formData),
      });
      console.log('Article mis à jour avec succès');

      await Promise.all(Object.entries(blocFormDatas).map(async ([blocId, data]) => {
        await fetch(`http://localhost:8000/api/blocs/${blocId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/ld+json',
          },
          body: JSON.stringify(data),
        });
      }));
      console.log('Blocs mis à jour avec succès');

      setMessageConfirmation('Changements pris en compte avec succès!');

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      setMessageConfirmation('Erreur lors de la mise à jour.');
    }
  };

  return (
    <div className={`w-full h-screen ${theme} md:shadow-lg`}>
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-6">
          <Navbar />
          <div className={`mt-8 ${theme}`}>
            {messageConfirmation && (
              <div className="text-green-500 mt-4">
                {messageConfirmation}
              </div>
            )}
            <form onSubmit={handleSubmit} className="w-full mx-auto">
              <div className="mb-4">
                <label htmlFor="titre" className="block font-bold">
                  Titre :
                </label>
                <input
                  type="text"
                  id="titre"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="resume" className="block font-bold">
                  Resume:
                </label>
                <input
                  type="text"
                  id="resume"
                  name="resume"
                  value={formData.resume}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="createur" className="block font-bold">
                  Createur:
                </label>
                <input
                  type="text"
                  id="createur"
                  name="createur"
                  value={formData.createur}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md w-full"
                />
              </div>
              <ul className="sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {blocs.map((bloc) => (
                  <BlocItem
                    key={bloc.id}
                    bloc={bloc}
                    onBlocChange={handleBlocChange}
                    blocFormData={blocFormDatas[bloc.id] || {}}
                  />
                ))}
              </ul>
              <button
                type="submit"
                className="bg-custom-blue text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
              >
                Mettre à jour
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

const AvCreation = ({ id }) => {
  return (
    <ThemeProvider>
      <UpdateArticleForm id={id} />
    </ThemeProvider>
  );
};

export default AvCreation;
