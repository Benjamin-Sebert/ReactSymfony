import React from 'react';
import Csv_Converter from './Csv_Converter';

const ArticleClassiqueVisualisation = ({ article }) => {
    return (
        <div className="w-full ml-4 border p-4 rounded">
            <h2 className="text-2xl font-bold">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.summary}</p>

            {article.blocks.map((block, index) => (
                <div key={index} className="mb-4">
                    {block.type === 'title' && (
                        <h3 className="text-xl font-semibold text-white">{block.content}</h3>
                    )}
                    {block.type === 'text' && (
                        <p className="mb-2 text-white">{block.content}</p>
                    )}
                    {block.type === 'image' && (
                        <img src={block.content} alt="Image" className="max-w-full" />
                    )}
                    {block.type === 'csv' && (
                        <Csv_Converter onJsonDataChange={block.content} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ArticleClassiqueVisualisation;
