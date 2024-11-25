import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import jsonData from '../../Component/Rekening.json'; // Replace with your JSON path

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DynamicPieChart = () => {
  // State for chart data
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Values',
      data: [],
      backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'], // Add more colors if needed
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'], // Border colors
      borderWidth: 1,
    }]
  });

  useEffect(() => {
    const labels = [];
    const values = [];

    // Extract headers and values from JSON for the chart
    jsonData.forEach(item => {
      labels.push(item.header);
      values.push(parseFloat(item.value));
    });

    setChartData({
      labels: labels,
      datasets: [{
        label: 'Values',
        data: values,
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'], // Add more colors if needed
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'], // Border colors
        borderWidth: 1,
      }]
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.dataset.label + ': ' + tooltipItem.raw.toFixed(2);
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-7xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">Pie Chart</h3>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default DynamicPieChart;
