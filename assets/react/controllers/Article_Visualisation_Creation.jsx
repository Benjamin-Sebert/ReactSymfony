import React, { useState } from 'react';
import ArticleGraphVisualisation from './Article_Graph_Visualisation'; // Assurez-vous d'importer le composant

const ArticleCreator = () => {
    const [article, setArticle] = useState({
        title: '',
        summary: '',
        blocks: []
    });

    const [numGraph, setNumGraph] = useState(0);

    const handleInputChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    };

    const addBlock = (type) => {
        if (type === 'csv') {
            const newBlock = { type, content: `Graphique n°${numGraph + 1}` };
            setNumGraph(numGraph + 1);
            setArticle({ ...article, blocks: [...article.blocks, newBlock] });
        } else {
            const newBlock = { type, content: '' };
            setArticle({ ...article, blocks: [...article.blocks, newBlock] });
        }
    };

    const removeBlock = (index) => {
        if (article.blocks[index].type === 'csv') {
            setNumGraph(numGraph - 1);
        }
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

                    <div href="#" className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                        <input
                            type="text"
                            placeholder="Titre du bloc"
                            value={block.content}
                            onChange={(e) => handleBlockChange(index, e.target.value)}
                            className="w-full px-3 py-2 mb-2 border rounded"
                        />

                    </div>

                );
                break;
            case 'text':
                blockContent = (
                    <div href="#" className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                        <textarea
                            placeholder="Texte du bloc"
                            value={block.content}
                            onChange={(e) => handleBlockChange(index, e.target.value)}
                            className="w-full px-3 py-2 mb-2 border rounded"
                            rows="4"
                        />

                    </div>

                );
                break;
            case 'image':
                blockContent = (
                    <div href="#" className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <input
                            type="file"
                            onChange={(e) => handleBlockChange(index, e.target.files[0])}
                            className="block w-full text-sm text-gray-500
               file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0
               file:text-sm file:font-semibold
               file:bg-violet-50 file:text-violet-700
               hover:file:bg-violet-100"
                        />
                    </div>

                );
                break;
            case 'csv':
                blockContent = (
                    <div href="#" className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{block.content}</h5>
                    </div>
                );
                break;
            default:
                blockContent = null;
        }

        return (
            <div key={index} className="mb-4">
                {blockContent}
                <button onClick={() => removeBlock(index)} className="w-full px-4 py-2 text-custom-black rounded bg-custom-green hover:bg-red-600">Supprimer ce bloc</button>
            </div>
        );
    };

    const createArticle = () => {
        console.log(article);

        //le code pour créer mon artcile
    };

    return (
        <div className="max-w-full mx-auto p-4 bg-grey-200 shadow-md rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre de l'article</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Entrez le titre ici"
                        value={article.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-purple focus:border-custom-purple"
                    />
    
                    <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Résumé de l'article</label>
                    <textarea
                        id="summary"
                        name="summary"
                        placeholder="Entrez le résumé ici"
                        value={article.summary}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-purple focus:border-custom-purple"
                        rows="4"
                    />
    
                    {article.blocks.map((block, index) => (
                        <div key={index} className="mb-4">
                            {renderBlock(block, index)}
                        </div>
                    ))}
    
                    <div className="flex space-x-4 mb-4">
                        <button onClick={() => addBlock('title')} className="px-4 py-2 text-white rounded bg-custom-purple hover:bg-purple-700 transition duration-300 ease-in-out">+ Titre</button>
                        <button onClick={() => addBlock('text')} className="px-4 py-2 text-white rounded bg-custom-purple hover:bg-purple-700 transition duration-300 ease-in-out">+ Texte</button>
                        <button onClick={() => addBlock('image')} className="px-4 py-2 text-white rounded bg-custom-purple hover:bg-purple-700 transition duration-300 ease-in-out">+ Image</button>
                        <button onClick={() => addBlock('csv')} className="px-4 py-2 text-white rounded bg-custom-purple hover:bg-purple-700 transition duration-300 ease-in-out">+ Graph</button>
                    </div>
    
                    <button onClick={createArticle} className="w-full px-4 py-2 text-white rounded bg-custom-green hover:bg-green-700 transition duration-300 ease-in-out">Créer mon article</button>
                </div>
                <ArticleGraphVisualisation article={article} />
            </div>
        </div>
    );
    
};

export default ArticleCreator;
