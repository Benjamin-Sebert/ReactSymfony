import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import axios from 'axios';
import UserEmailFetcher from './UserEmailFetcher'; // Assurez-vous d'ajuster le chemin du fichier si nécessaire

const media = (props) => {
    const userEmail = UserEmailFetcher();
    const [resourceName, setResourceName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [mediaResources, setmediaResources] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mediaResponse = await axios.get('http://localhost:8000/api/medias');
                setmediaResources(mediaResponse.data['hydra:member']);
                console.log(mediaResponse);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedFile(file);
            console.log('Selected file:', file.name);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !resourceName) {
            console.error('Veuillez sélectionner un fichier et ajouter un nom à la ressource.');
            return;
        }
        
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('file_type', selectedFile.type);
        formData.append('user', userEmail);
        formData.append('nom_ressource', resourceName);

        try {
            const response = await fetch('http://localhost:8000/api/medias', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('File uploaded successfully:', data);

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const deletemedia = async (id) => {
        try {
            // Delete media resource
            await axios.delete(`http://localhost:8000/api/medias/${id}`);
            // Update state to reflect the removal
            setmediaResources(mediaResources.filter(mediaResource => mediaResource.id !== id));
        } catch (error) {
            console.error('Error deleting media resource:', error);
        }
    };

    return (
        <div className="w-screen h-screen">
            <div className="flex flex-col md:flex-row h-screen">
                <Sidebar />
                <main className="flex-1 p-6">
                    <Navbar/>

                    <div className="gap-8 mt-6">
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-full">
                                <div className="mb-6">
                                    <h1 className="text-2xl font-semibold mb-2">Formulaire de Ressource</h1>
                                    <p className="text-gray-600">Ajoutez une nouvelle ressource à Stare It</p>
                                </div>

                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Sélectionner un fichier</label>
                                        <input
                                            type="file"
                                            accept=".media, image/*"
                                            onChange={handleFileChange}
                                            className="mt-1 p-2 block w-full border rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Nom de la ressource</label>
                                        <input
                                            type="text"
                                            placeholder="Nom de la ressource"
                                            value={resourceName}
                                            onChange={(e) => setResourceName(e.target.value)}
                                            className="mt-1 p-2 block w-full border rounded-md"
                                        />
                                    </div>

                                    {selectedFile && (
                                        <div>
                                            <p className="text-gray-700">{selectedFile.name}</p>
                                        </div>
                                    )}

                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            onClick={handleUpload}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Upload
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Ressources media disponibles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mediaResources.map((mediaResource) => (
                                <div key={mediaResource.id} className="p-4 bg-white rounded-md shadow-md">
                                    <p className="text-gray-700 font-semibold">Nom de la ressource : {mediaResource.nom_ressource}</p>
                                    <p className="text-gray-600">Upload par : {mediaResource.user}</p>
                                    <button
                                        type="button"
                                        onClick={() => deletemedia(mediaResource.id)}
                                        className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default media;