import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticleBlock = ({ index, block, updateBlock, removeBlock }) => {
    const [csvOptions, setCsvOptions] = useState([]);
    const [imageOptions, setImageOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const csvResponse = await axios.get('http://localhost:8000/api/csvs');
                setCsvOptions(csvResponse.data['hydra:member']);

                const mediaResponse = await axios.get('http://localhost:8000/api/medias');
                setImageOptions(mediaResponse.data['hydra:member']);
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error.message);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (field, value) => {
        updateBlock(index, { ...block, [field]: value });
    };

    return (
        <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Bloc {index + 1}</h2>

            <label htmlFor={`blockTitre${index}`} className="block text-sm font-medium text-gray-600">
                Titre du bloc
            </label>
            <input
                type="text"
                id={`blockTitre${index}`}
                name={`blockTitre${index}`}
                value={block.Titre}
                onChange={(e) => handleInputChange('Titre', e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
            />

            {/* Choisir un fichier image */}
            <label htmlFor={`imagePath${index}`} className="block text-sm font-medium text-gray-600 mt-2">
                Choisir un fichier image
            </label>
            <select
                id={`imagePath${index}`}
                name={`imagePath${index}`}
                value={block.imagePath}
                onChange={(e) => handleInputChange('imagePath', e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
            >
                <option value="">Sélectionner un fichier image</option>
                {imageOptions.map(option => (
                    <option key={option.id} value={option.filePath}>{option.nom_ressource}</option>
                ))}
            </select>

            {/* Texte du bloc */}
            <label htmlFor={`blockTexte${index}`} className="block text-sm font-medium text-gray-600 mt-2">
                Texte du bloc
            </label>
            <textarea
                id={`blockTexte${index}`}
                name={`blockTexte${index}`}
                value={block.Texte}
                onChange={(e) => handleInputChange('Texte', e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
            ></textarea>

            {/* Choisir un fichier CSV */}
            <label htmlFor={`csvPath${index}`} className="block text-sm font-medium text-gray-600 mt-2">
                Choisir un fichier CSV
            </label>
            <select
                id={`csvPath${index}`}
                name={`csvPath${index}`}
                value={block.csvPath}
                onChange={(e) => handleInputChange('csvPath', e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
            >
                <option value="">Sélectionner un fichier CSV</option>
                {csvOptions.map(option => (
                    <option key={option.id} value={option.filePath}>{option.nom_ressource}</option>
                ))}
            </select>

            {/* Supprimer ce bloc */}
            <button
                type="button"
                onClick={() => removeBlock(index)}
                className="mt-2 text-red-500"
            >
                Supprimer ce bloc
            </button>
        </div>
    );
};

export default ArticleBlock;
