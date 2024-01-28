import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import Chart from 'chart.js/auto';
import 'chartjs-chart-box-and-violin-plot'; // Importation du plugin

const BarChart = ({ csvUrl, colonne }) => {
    const [chartData, setChartData] = useState({});
    const [chartType, setChartType] = useState('bar');
    const chartRef = useRef(null);

    const parseCSV = (data) => {
        const parsedData = Papa.parse(data, { header: true, delimiter: ';' });
        const selectedColumn = parsedData.meta.fields.includes(colonne) ? colonne : parsedData.meta.fields[1];

        const labels = parsedData.data.map(row => row[parsedData.meta.fields[0]]);
        const datasetData = parsedData.data.map(row => parseFloat(row[selectedColumn]) || 0);

        const dataset = {
            label: selectedColumn,
            data: datasetData,
            fill: chartType === 'line',
            backgroundColor: chartType === 'bar' ? 'rgba(0, 123, 255, 0.5)' : 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 123, 255, 1)',
            showLine: chartType !== 'scatter',
        };

        return { labels, datasets: [dataset] };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(csvUrl);
                const data = await response.text();
                const chartData = parseCSV(data);
                setChartData(chartData);
            } catch (error) {
                console.error('CSV data:', error);
            }
        };

        fetchData();
    }, [csvUrl, colonne]);

    useEffect(() => {
        if (Object.keys(chartData).length) {
            const myChart = new Chart(chartRef.current, {
                type: chartType,
                data: chartData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                }
            });

            return () => myChart.destroy();
        }
    }, [chartData, chartType]);

    return (
        <div>
            <h2>Graphique des Données</h2>
            <select value={chartType} onChange={(event) => setChartType(event.target.value)}>
                <option value="polarArea">PolarArea</option>
                <option value="bar">Bar</option>
                <option value="line">Line</option>
            </select>
            <canvas ref={chartRef} />
        </div>
    );
};

export default BarChart;
