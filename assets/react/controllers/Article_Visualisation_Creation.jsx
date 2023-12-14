import React, { useState } from 'react';
import ArticleClassiqueVisualisation from './Article_Visualisation'; // Assurez-vous d'importer le composant

const ArticleCreator = () => {
    const [article, setArticle] = useState({
        title: '',
        summary: '',
        blocks: []
    });

    const handleInputChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    };

    const addBlock = (type) => {
        const newBlock = { type, content: '' };
        setArticle({ ...article, blocks: [...article.blocks, newBlock] });
    };

    const removeBlock = (index) => {
        const newBlocks = article.blocks.filter((_, i) => i !== index);
        setArticle({ ...article, blocks: newBlocks });
    };

    const handleBlockChange = (index, value) => {
        const newBlocks = [...article.blocks];
        newBlocks[index].content = value;
        setArticle({ ...article, blocks: newBlocks });
    };

    const renderBlock = (block, index) => {
        let blockContent;
        switch (block.type) {
            case 'title':
                blockContent = (
                    <input
                        type="text"
                        placeholder="Titre du bloc"
                        value={block.content}
                        onChange={(e) => handleBlockChange(index, e.target.value)}
                        className="w-full px-3 py-2 mb-2 border rounded"
                    />
                );
                break;
            case 'text':
                blockContent = (
                    <textarea
                        placeholder="Texte du bloc"
                        value={block.content}
                        onChange={(e) => handleBlockChange(index, e.target.value)}
                        className="w-full px-3 py-2 mb-2 border rounded"
                        rows="4"
                    />
                );
                break;
            case 'image':
                blockContent = (
                    <input
                        type="file"
                        onChange={(e) => handleBlockChange(index, e.target.files[0])}
                        className="w-full px-3 py-2 mb-2 border rounded"
                    />
                );
                break;
            case 'csv':
                blockContent = (
                    <h1>Graphique</h1>
                );
                break;
            default:
                blockContent = null;
        }

        return (
            <div key={index} className="mb-4">
                {blockContent}
                <button onClick={() => removeBlock(index)} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">Supprimer ce bloc</button>
            </div>
        );
    };

    const createArticle = () => {
        console.log(article);
        // Ici, vous pouvez ajouter le code pour envoyer l'article à votre backend
    };

    return (
        <div className="container mx-auto p-4 flex">
            <div className="w-1/2">
                <input
                    type="text"
                    name="title"
                    placeholder="Titre de l'article"
                    value={article.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 mb-4 border rounded"
                />
                <textarea
                    name="summary"
                    placeholder="Résumé de l'article"
                    value={article.summary}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 mb-4 border rounded"
                    rows="4"
                />

                {article.blocks.map((block, index) => (
                    <div key={index}>
                        {renderBlock(block, index)}
                    </div>
                ))}

                <div className="flex space-x-4 mb-4">
                    <button onClick={() => addBlock('title')} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Ajouter Titre</button>
                    <button onClick={() => addBlock('text')} className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">Ajouter Texte</button>
                    <button onClick={() => addBlock('image')} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">Ajouter Image</button>
                    <button onClick={() => addBlock('csv')} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">Ajouter </button>
                </div>

                <button onClick={createArticle} className="w-full px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600">Créer mon article</button>
            </div>
            <ArticleClassiqueVisualisation article={article} />
        </div>
    );
};

export default ArticleCreator;
