import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import UserEmailFetcher from './UserEmailFetcher'; // Assurez-vous d'ajuster le chemin du fichier si nécessaire
import { ThemeProvider, useTheme } from './ThemeContext';

const Media = (props) => {
    const { theme } = useTheme();

    const userEmail = UserEmailFetcher();
    const [resourceName, setResourceName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageResources, setimageResources] = useState([]);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [imageToDeleteId, setimageToDeleteId] = useState(null); // Ajout de l'ID du image à supprimer
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false); // Pour afficher la boîte de dialogue de confirmation

    useEffect(() => {
        const fetchData = async () => {
            try {
                const imageResponse = await axios.get('http://localhost:8000/api/images');
                setimageResources(imageResponse.data['hydra:member']);
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
            const response = await axios.post('http://localhost:8000/api/images', formData);
            setConfirmationMessage('Le fichier image a été téléchargé avec succès.');
            setimageResources([...imageResources, response.data]);
            setSelectedFile(null);
            setResourceName('');
        } catch (error) {
            console.error('Error uploading image file:', error);
        }
    }, [selectedFile, resourceName, imageResources, userEmail]);

    const deleteimage = useCallback(async (id) => {
        setimageToDeleteId(id); // Stocker l'ID du fichier image à supprimer
        setShowConfirmationDialog(true); // Afficher la boîte de dialogue de confirmation
    }, []);

    const confirmDeleteimage = useCallback(async () => {
        try {
            await axios.delete(`http://localhost:8000/api/images/${imageToDeleteId}`);
            setimageResources(imageResources.filter(imageResource => imageResource.id !== imageToDeleteId));
            setConfirmationMessage('Le fichier image a été supprimé avec succès.');
            setShowConfirmationDialog(false); // Cacher la boîte de dialogue après suppression
        } catch (error) {
            console.error('Error deleting image resource:', error);
        }
    }, [imageResources, imageToDeleteId]);

    const cancelDeleteimage = useCallback(() => {
        setShowConfirmationDialog(false); // Cacher la boîte de dialogue d'annulation
    }, []);

    return (
        <div className={`w-screen h-screen ${theme} md:shadow-lg`}>
            <div className="flex flex-col md:flex-row h-screen">

                <Sidebar />

                <main className="flex-1 p-6">
                    <Navbar />

                    <div className="gap-8 mt-6">
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-full">
                                <div className="mb-6">
                                    <h1 className="text-2xl font-semibold mb-2 text-white">Formulaire de Ressource (images)</h1>
                                    <p>Ajoutez une nouvelle ressource CSV à Stare It</p>
                                </div>

                                {confirmationMessage && (
                                    <div className="text-green-500">{confirmationMessage}</div>
                                )}

                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-xl">Sélectionner un fichier</label>
                                        <input
                                            type="file"
                                            accept=".images, image/*"
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
                        <h2 className="text-xl font-semibold mb-4">Ressources images disponibles</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {imageResources.map((imageResource) => (
                                <div key={imageResource.id} className="p-4 bg-white rounded-md shadow-md">
                                    {/* Afficher la miniature de l'image */}
                                    <img
                                        src={`http://localhost:8000/images/${imageResource.filePath}`}
                                        alt={`Miniature de ${imageResource.nom_ressource}`}
                                        className="w-full h-40 object-cover mb-2 rounded-md"
                                    />

                                    <p className="text-gray-700 font-semibold">Nom de la ressource : {imageResource.nom_ressource}</p>
                                    <p className="text-gray-600">Upload par : {imageResource.user}</p>
                                    <button
                                        type="button"
                                        onClick={() => deleteimage(imageResource.id)}
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
                        <p className="text-lg text-black font-semibold">Confirmez la suppression du fichier image ?</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={confirmDeleteimage}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                            >
                                Confirmer
                            </button>
                            <button
                                onClick={cancelDeleteimage}
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
            <Media />
        </ThemeProvider>
    );
};

export default AvCreation;
