// Dashboard.jsx
import React, { useState } from 'react';
import Article_Visualisation_Creation from './Article_Visualisation_Creation';

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
        <div className="gap-8 mt-6" id="Visu">
            
            <Article_Visualisation_Creation/>
            
        </div>

    );
};

export default Dashboard;
