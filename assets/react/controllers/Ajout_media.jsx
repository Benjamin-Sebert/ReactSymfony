import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import AvatarButton from './Avatar';
import ThemeToggle from './ThemeToggle';
import axios from 'axios';

const Theme = (props) => {
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users');
                const userEmail = response.data['hydra:member'][0].email;
                console.log(response)
                setEmail(userEmail);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, []); 

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedFile(file);
            console.log('Selected file:', file.name);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            console.error('No file selected for upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('file_type', selectedFile.type);
        formData.append('user', email);

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

    return (
        <div className="w-screen h-screen">
            <div className="flex flex-col md:flex-row h-screen">
                <Sidebar />
                
                <main className="flex-1 p-6">
                    <div className="flex items-center justify-between border-b border-custom-black pb-4">
                        <h1 className="font-bold text-black">Stare<span className="font-bold text-custom-red">It</span></h1>
                        <div className="flex items-center space-x-4">

                            <AvatarButton />
                            <ThemeToggle />
                            

                        </div>
                        
                    </div>

                    <div className="gap-8 mt-6">

                        <div className='Theme'>
                            <input type='file' accept='.csv, image/*' onChange={handleFileChange} />
                            {selectedFile && (
                                <>
                                    <p>{selectedFile.name}</p>
                                    <button onClick={handleUpload}>Upload</button>
                                </>
                            )}
                        </div>

                        <div>
                            {email ? (
                                <p>L'utilisateur connecté a l'email : {email}</p>
                            ) : (
                                <p>Chargement en cours...</p>
                            )}
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Theme;