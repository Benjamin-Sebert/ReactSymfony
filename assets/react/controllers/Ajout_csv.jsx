import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import UserEmailFetcher from './UserEmailFetcher';
import { ThemeProvider, useTheme } from './ThemeContext';

const Csv = (props) => {
    const { theme } = useTheme();

    const userEmail = UserEmailFetcher();
    const [resourceName, setResourceName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [csvResources, setCsvResources] = useState([]);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [csvToDeleteId, setCsvToDeleteId] = useState(null);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const csvResponse = await axios.get('http://localhost:8000/api/csvs');
                setCsvResources(csvResponse.data['hydra:member']);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, []);

    const handleFileChange = useCallback((event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    }, []);

    const handleUpload = useCallback(async () => {
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
            const response = await axios.post('http://localhost:8000/api/csvs', formData);
            setConfirmationMessage('Le fichier CSV a été téléchargé avec succès.');
            setCsvResources([...csvResources, response.data]);
            setSelectedFile(null);
            setResourceName('');
        } catch (error) {
            console.error('Error uploading CSV file:', error);
        }
    }, [selectedFile, resourceName, csvResources, userEmail]);

    const deleteCsv = useCallback(async (id) => {
        setCsvToDeleteId(id);
        setShowConfirmationDialog(true);
    }, []);

    const confirmDeleteCsv = useCallback(async () => {
        try {
            await axios.delete(`http://localhost:8000/api/csvs/${csvToDeleteId}`);
            setCsvResources(csvResources.filter(csvResource => csvResource.id !== csvToDeleteId));
            setConfirmationMessage('Le fichier CSV a été supprimé avec succès.');
            setShowConfirmationDialog(false);
        } catch (error) {
            console.error('Error deleting CSV resource:', error);
        }
    }, [csvResources, csvToDeleteId]);

    const cancelDeleteCsv = useCallback(() => {
        setShowConfirmationDialog(false);
    }, []);

    return (
        <div className={`w-screen ${theme} md:shadow-lg`}>
            <div className="flex flex-col md:flex-row h-screen">

                <Sidebar />

                <main className="flex-1 p-6">

                    <Navbar />


                    <div className="gap-8 mt-6">
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-full">
                                <div className="mb-6">
                                    <h1 className="text-2xl font-semibold mb-2">Formulaire de Ressource (CSV)</h1>
                                    <p>Ajoutez une nouvelle ressource CSV à Stare It</p>
                                </div>

                                {confirmationMessage && (
                                    <div className="text-green-500">{confirmationMessage}</div>
                                )}

                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-xl font-semibold">Sélectionner un fichier</label>
                                        <input
                                            type="file"
                                            accept=".csv"
                                            onChange={handleFileChange}
                                            className="mt-1 p-2 block w-full border rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xl font-semibold">Nom de la ressource</label>
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
                                            className="bg-custom-blue text-white font-bold py-2 px-4 rounded"
                                        >
                                            Upload
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Ressources CSV disponibles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {csvResources.map((csvResource) => (
                                <div key={csvResource.id} className="p-4 bg-white rounded-md shadow-md">
                                    <p className="text-gray-700 font-semibold">Nom de la ressource : {csvResource.nom_ressource}</p>
                                    <p className="text-gray-600">Upload par : {csvResource.user}</p>
                                    <button
                                        type="button"
                                        onClick={() => deleteCsv(csvResource.id)}
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
            {showConfirmationDialog && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-md">
                        <p className="text-lg text-black font-semibold">Confirmez la suppression du fichier csv ?</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={confirmDeleteCsv}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                            >
                                Confirmer
                            </button>
                            <button
                                onClick={cancelDeleteCsv}
                                className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AvCreation = () => {
    return (
        <ThemeProvider>
            <Csv />
        </ThemeProvider>
    );
};

export default AvCreation;
