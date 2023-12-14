// Dashboard.jsx
import React, { useState } from 'react';
import Article_Creation from './Article_Creation'; // Assurez-vous que le chemin d'accès est correct

const Dashboard = () => {
    const [articles, setArticles] = useState([]);
    const [newArticle, setNewArticle] = useState({ type: 'classique', title: '', content: '' });

    const handleInputChange = (e) => {
        setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
    };

    const addArticle = () => {
        setArticles([...articles, newArticle]);
        setNewArticle({ type: 'classique', title: '', content: '' });
    };

    return (
        <div className="p-4">
            <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <Article_Creation/>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Articles Créés</h2>
                <div className="grid grid-cols-3 gap-4">
                    {articles.map((article, index) => (
                        <div key={index} className="p-4 m-4 border border-gray-200 shadow rounded">
                            <p className="font-bold">{article.title} ({article.type})</p>
                            <p>{article.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Dashboard;
