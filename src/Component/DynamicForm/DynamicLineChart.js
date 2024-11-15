import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import data from '../../Component/Transaction.json'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DynamicLineChart = () => {
  // Sample data (replace this with your real data or dynamic data)

  // Prepare chart data
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Balance',
      data: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: false,
      tension: 0.1
    }]
  });

  useEffect(() => {
    const labels = [];
    const balanceData = [];

    // Extract dates and balance for the chart
    data.forEach(item => {
      labels.push(item.date);
      balanceData.push(parseFloat(item.balance));
    });

    setChartData({
      labels: labels,
      datasets: [{
        label: 'Balance',
        data: balanceData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.1
      }]
    });
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.dataset.label + ': ' + tooltipItem.raw.toFixed(2);
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        }
      },
      y: {
        title: {
          display: true,
          text: 'Balance',
        },
        ticks: {
          callback: function(value) {
            return value.toFixed(2); // Show 2 decimal places
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-7xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">Balance Over Time</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default DynamicLineChart;
