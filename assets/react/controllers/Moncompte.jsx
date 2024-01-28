import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { ThemeProvider, useTheme } from './ThemeContext';

function UpdateUserForm({ id }) {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    email: '',
    nom: '',
    prenom: '',
    roles: [],
    password: '',
  });

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/ld+json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Utilisateur mis à jour avec succès :', data);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      });
  };

  return (
    <div className={`w-full h-screen ${theme} md:shadow-lg`}>
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-6">
          <Navbar />
          <div className={`mt-8 ${theme}`}>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="mb-4">
                <label htmlFor="email" className="block font-bold">
                  Email:
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="nom" className="block font-bold">
                  Nom:
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="prenom" className="block font-bold">
                  Prénom:
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="roles" className="block font-bold">
                  Rôles:
                </label>
                <input
                  type="text"
                  id="roles"
                  name="roles"
                  value={formData.roles}
                  onChange={handleChange}
                  readOnly
                  className="border border-gray-400 p-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-bold">
                  Mot de passe:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-custom-blue text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
              >
                Mettre à jour
              </button>
            </form>
          </div>
        </main>
      </div >
    </div >

  );
}

const AvCreation = ({ id }) => {

  return (
    <ThemeProvider>
      <UpdateUserForm id={id} />
    </ThemeProvider>
  );
};

export default AvCreation;
