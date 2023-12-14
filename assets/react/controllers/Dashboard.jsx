// Dashboard.jsx
import React, { useState } from 'react';
import Article_Creation from './Article_Visualisation_Creation'; // Assurez-vous que le chemin d'accès est correct

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
        <div className="p-40 w-full" id="Visu">
            
            <Article_Creation/>
            
        </div>

    );
};

export default Dashboard;
