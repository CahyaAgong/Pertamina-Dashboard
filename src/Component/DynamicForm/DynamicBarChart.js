import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import jsonData from '../../Component/Rekening.json'; // Replace with your JSON path

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DynamicBarChart = () => {
  // State for chart data
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Values',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
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
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
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
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categories',
        }
      },
      y: {
        title: {
          display: true,
          text: 'Values',
        },
        ticks: {
          callback: function (value) {
            return value.toFixed(2); // Show 2 decimal places
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-7xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">Transaction Chart</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DynamicBarChart;
