import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserEmailFetcher = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users');
        const userEmail = response.data['hydra:member'][0].email;
        setEmail(userEmail);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  return email;
};

export default UserEmailFetcher;
