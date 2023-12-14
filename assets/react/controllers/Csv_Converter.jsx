import React, { useState } from 'react';

const CSVToJsonConverter = ({ onJsonDataChange }) => {
    const [jsonData, setJsonData] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            Papa.parse(file, {
                delimiter: ";", // Définir le délimiteur pour le point-virgule
                header: true,
                complete: (results) => {
                    const jsonResult = JSON.stringify(results.data, null, 2);
                    setJsonData(jsonResult);
                    // Mettez à jour l'état dans le composant parent en utilisant la fonction passée en prop
                    onJsonDataChange(jsonResult);
                }
            });
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} accept=".csv" />
            
            <textarea 
                value={jsonData || ''} 
                readOnly 
                rows={10} 
                style={{ width: '100%' }} 
            />
        </div>
    );
};

export default CSVToJsonConverter;
