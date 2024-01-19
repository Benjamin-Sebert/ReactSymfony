// Bloc_article.js
import React from 'react';

const ArticleBlock = ({ index, block, updateBlock, removeBlock }) => {
    const handleBlockChange = (field, value) => {
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
                onChange={(e) => handleBlockChange('Titre', e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
            />

            <label htmlFor={`blockTexte${index}`} className="block text-sm font-medium text-gray-600 mt-2">
                Texte du bloc
            </label>
            <textarea
                id={`blockTexte${index}`}
                name={`blockTexte${index}`}
                value={block.Texte}
                onChange={(e) => handleBlockChange('Texte', e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
            ></textarea>

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
