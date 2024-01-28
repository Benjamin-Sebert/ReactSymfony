import React, { useState } from 'react';
import { useTheme } from './ThemeContext';

const ContactForm = ({ email }) => {
  const { theme } = useTheme();
  console.log(email);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: email,
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        location.href = '/contact/merci';
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className={` ${theme} w-full`}>
      <h3 className="text-4xl font-bold mb-4">Contactez nous</h3>
      <form action="http://localhost:8000/contact" onSubmit={handleSubmit} className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Prenom</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Votre message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Envoyer le message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
