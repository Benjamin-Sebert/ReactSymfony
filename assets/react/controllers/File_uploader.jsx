// FileUploader.jsx

import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedMedia, setUploadedMedia] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/api/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Mettez à jour la liste des médias après le téléchargement
      setUploadedMedia([...uploadedMedia, response.data]);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du fichier :', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="mb-4">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} className="bg-blue-500 text-white p-2 rounded">Envoyer</button>
      </div>

      <div className="flex flex-wrap">
        {uploadedMedia.map((media, index) => (
          <div key={index} className="m-2">
            <img src={media.url} alt={`Media ${index}`} className="w-32 h-32 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;