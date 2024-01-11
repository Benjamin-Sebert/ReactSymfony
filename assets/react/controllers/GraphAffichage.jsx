import React, { useState, useEffect, useRef } from 'react';

const BarChart = () => {
    const [file, setFile] = useState(null);
    const [chartData, setChartData] = useState({});
    const [chartType, setChartType] = useState('bar');
    const chartRef = useRef(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    };

    const parseCSV = (data) => {
        const parsedData = Papa.parse(data, { header: true });
        const labels = parsedData.data.map(row => row[parsedData.meta.fields[0]]);
        const datasets = parsedData.meta.fields.slice(1).map(field => {
            return {
                label: field,
                data: parsedData.data.map(row => row[field])
            };
        });
        return { labels, datasets };
    };

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const chartData = parseCSV(e.target.result);
                setChartData(chartData);
            };
            reader.readAsText(file);
        }
    }, [file]);

    useEffect(() => {
        if (Object.keys(chartData).length) {
            const myChart = new Chart(chartRef.current, {
                type: chartType,
                data: {
                    labels: chartData.labels,
                    datasets: chartData.datasets
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Nom de l\'axe X'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Nom de l\'axe Y'
                            }
                        }
                    }
                }
            });

            return () => myChart.destroy();
        }
    }, [chartData, chartType]);

    return (
        <div className="w-full mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Graphique des données</h2>
            <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
               file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0
               file:text-sm file:font-semibold
               file:bg-violet-50 file:text-violet-700
               hover:file:bg-violet-100"
            />
            <select
                value={chartType}
                onChange={handleChartTypeChange}
                className="block w-full mt-3 mb-4 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500"
            >
                <option value="bar">Barre</option>
                <option value="line">Ligne</option>
                <option value="pie">Camembert</option>
                <option value="scatter">Scatter</option>
            </select>
            <canvas ref={chartRef} className="mt-4" />
        </div>

    );
};

export default BarChart;
