import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';

const BarChart = ({ csvUrl }) => {
    const [chartData, setChartData] = useState({});
    const [chartType, setChartType] = useState('bar');
    const chartRef = useRef(null);

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
        const fetchData = async () => {
            try {
                const response = await fetch(csvUrl);
                const data = await response.text();
                const chartData = parseCSV(data);
                setChartData(chartData);
            } catch (error) {
                console.error('Error fetching CSV data:', error);
            }
        };

        fetchData();
    }, [csvUrl]);

    useEffect(() => {
        if (Object.keys(chartData).length) {
            const myChart = new Chart(chartRef.current, {
                type: chartType,
                data: {
                    labels: chartData.labels,
                    datasets: chartData.datasets
                },
                options: {}
            });

            return () => myChart.destroy();
        }
    }, [chartData, chartType]);

    return (
        <div>
            <h2>Graphique des Données</h2>
            <select value={chartType} onChange={(event) => setChartType(event.target.value)}>
                <option value="bar">Barre</option>
                <option value="line">Ligne</option>
                <option value="pie">Camembert</option>
            </select>
            <canvas ref={chartRef} />
        </div>
    );
};

export default BarChart;
