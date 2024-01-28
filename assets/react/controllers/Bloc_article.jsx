import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const ArticleBlock = ({ index, block, updateBlock, removeBlock }) => {
    const [csvOptions, setCsvOptions] = useState([]);
    const [imageOptions, setImageOptions] = useState([]);
    const [selectedCsvColumns, setSelectedCsvColumns] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [csvResponse, mediaResponse] = await Promise.all([
                    axios.get('http://localhost:8000/api/csvs'),
                    axios.get('http://localhost:8000/api/images')
                ]);
                setCsvOptions(csvResponse.data['hydra:member']);
                setImageOptions(mediaResponse.data['hydra:member']);
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error.message);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (name, value) => {
        updateBlock(index, { ...block, [name]: value });
    };

    const handleCsvChange = async (filePath) => {
        handleInputChange('csvPath', filePath);
        setSelectedCsvColumns([]);

        if (filePath) {
            try {
                const csvResponse = await axios.get(`csv/${filePath}`);
                const csvData = Papa.parse(csvResponse.data, { header: true });
                const columns = csvData.meta.fields;
                setSelectedCsvColumns(columns);
            } catch (error) {
                console.error('Erreur lors de la récupération des colonnes du CSV', error.message);
            }
        }
    };

    const handleCsvColumnChange = async (Column) => {
        handleInputChange('Colonne', Column);
    };
    const handleImageClick = (imagePath) => {
        handleInputChange('imagePath', imagePath);
        setSelectedImage(imagePath);
    };

    return (
        <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Bloc {index + 1}</h2>

            <label htmlFor={`blockTitre${index}`} className="block text-xl">
                Titre du bloc
            </label>
            <input
                type="text"
                id={`blockTitre${index}`}
                name={`blockTitre${index}`}
                value={block.Titre}
                onChange={(e) => handleInputChange('Titre', e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
                style={{ color: 'black' }}
            />

            <label htmlFor={`imagePath${index}`} className="block text-xl mt-2">
                Choisir un fichier image
            </label>
            <div className="flex mt-1 space-x-2">
                {imageOptions.map(option => (
                    <div key={option.id} onClick={() => handleImageClick(option.filePath)}>
                        <img
                            src={`http://localhost:8000/images/${option.filePath}`}
                            alt={option.nom_ressource}
                            className={`cursor-pointer border rounded-md ${selectedImage === option.filePath ? 'border-blue-500' : ''}`}
                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                        />
                    </div>
                ))}
            </div>

            <label htmlFor={`blockTexte${index}`} className="block text-xl mt-2">
                Texte du bloc
            </label>
            <textarea
                id={`blockTexte${index}`}
                name={`blockTexte${index}`}
                value={block.Texte}
                onChange={(e) => handleInputChange('Texte', e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
                style={{ color: 'black' }}
            ></textarea>

            <label htmlFor={`csvPath${index}`} className="block text-xl mt-2">
                Choisir un fichier CSV
            </label>
            <select
                id={`csvPath${index}`}
                name={`csvPath${index}`}
                value={block.csvPath}
                onChange={(e) => handleCsvChange(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
                style={{ color: 'black' }}
            >
                <option value="">Sélectionner un fichier CSV</option>
                {csvOptions.map(option => (
                    <option key={option.id} value={option.filePath}>{option.nom_ressource}</option>
                ))}
            </select>

            <label htmlFor={`csvColumn${index}`} className="block text-xl mt-2">
                Choisir une colonne du CSV
            </label>
            <select
                id={`csvColumn${index}`}
                name={`csvColumn${index}`}
                value={block.Colonne}
                onChange={(e) => handleCsvColumnChange(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
                style={{ color: 'black' }}
            >
                <option value="">Sélectionner une colonne du CSV</option>
                {selectedCsvColumns.map(column => (
                    <option key={column} value={column}>{column}</option>
                ))}
            </select>

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
