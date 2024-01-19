import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import axios from 'axios';

const csv = (props) => {
    const [email, setEmail] = useState(null);
    const [resourceName, setResourceName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [csvResources, setCsvResources] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                /*const response = await axios.get('http://localhost:8000/api/users');
                const userEmail = response.data['hydra:member'][0].email;
                setEmail(userEmail);*/

                const csvResponse = await axios.get('http://localhost:8000/api/csvs');
                setCsvResources(csvResponse.data['hydra:member']);
                console.log(csvResources);
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
        formData.append('user', email);
        formData.append('nom_ressource', resourceName);

        try {
            const response = await fetch('http://localhost:8000/api/csvs', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('File uploaded successfully:', data);

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="w-screen h-screen">
            <div className="flex flex-col md:flex-row h-screen">
                <Sidebar />
                <main className="flex-1 p-6">
                    <Navbar />

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
                                            accept=".csv, image/*"
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

                    {/* CSV resources section */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Ressources CSV disponibles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {csvResources.map((csvResource) => (
                                <div key={csvResource.id} className="p-4 bg-white rounded-md shadow-md">
                                    <p className="text-gray-600">{csvResource.contentUrl}</p>
                                    {/* Add more details as needed */}
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default csv;
