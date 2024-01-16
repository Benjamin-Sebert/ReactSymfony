import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AvatarButton from './Avatar';

const Theme = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Check if the selected file has a valid extension (.css)
            if (file.name.endsWith('.css')) {
                setSelectedFile(file);
                console.log('Selected file:', file.name);
            } else {
                console.error('Invalid file type. Please select a .css file.');
            }
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            console.error('No file selected for upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:8000/api/themes', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('File uploaded successfully:', data);

            // Handle any additional logic after successful upload, if needed.
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="w-screen h-screen">
            <div className="flex flex-col md:flex-row h-screen">
                <Sidebar />

                <main className="flex-1 bg-gray-100 p-6">
                    <div className="flex items-center justify-between border-b border-custom-black pb-4">
                        <h1 className="font-bold text-black">Stare<span className="font-bold text-custom-red">It</span></h1>
                        <div className="flex items-center space-x-4">

                            <AvatarButton />

                        </div>
                    </div>

                    <div className="gap-8 mt-6">

                        <div className='Theme'>
                            <input type='file' accept='.css' onChange={handleFileChange} />
                            {selectedFile && (
                                <>
                                    <p>{selectedFile.name}</p>
                                    <button onClick={handleUpload}>Upload</button>
                                </>
                            )}
                        </div>


                        <Article_Visualisation_Creation />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Theme;