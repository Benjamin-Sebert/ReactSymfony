import React, { useState } from 'react';
import { useTheme } from './ThemeContext';

const ContactForm = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
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

    // Effectuer une requête POST vers votre backend Symfony
    fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        // Traiter la réponse du backend, rediriger si nécessaire, etc.
        console.log(data);
        location.href = '/contact/merci';
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className={` ${theme} max-w-sm mx-auto`}>
      
      <h3 className="text-4xl font-bold mb-4">Contactez nous</h3>
      <form action="http://localhost:8000/contact" onSubmit={handleSubmit} className="message max-w-md"> {/* Réduction de la largeur avec max-w-md */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="border text-black rounded w-full py-2 px-3 bg-gray-800 text-white" // Utilisation de bg-gray-800 et ajout de text-white
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Prenom</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className="border text-black rounded w-full py-2 px-3 bg-gray-800 text-white" // Utilisation de bg-gray-800 et ajout de text-white
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border text-black rounded w-full py-2 px-3 bg-gray-800 text-white" // Utilisation de bg-gray-800 et ajout de text-white
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Votre message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="border text-black rounded w-full py-2 px-3 bg-gray-800 text-white" // Utilisation de bg-gray-800 et ajout de text-white
          ></textarea>
        </div>
        <button type="submit" className="bg-custom-red py-2 px-4 rounded">
          Envoyer le message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
