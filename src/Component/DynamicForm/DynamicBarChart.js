import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import jsonData from '../JSON/DetailKriteria.json'; // Replace with your JSON path

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DynamicBarChart = () => {
  // State for chart data
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Min Debit',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red for Min Debit
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Max Credit',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue for Max Credit
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }
    ]
  });

  // Function to format numbers as IDR without rounding and showing all decimals
  const formatIDR = (number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,  // Ensure at least two decimal places
      maximumFractionDigits: 20  // Allow up to 20 decimal places
    }).format(number);
  };

  useEffect(() => {
    const labels = [];
    const minDebitData = [];
    const maxCreditData = [];

    // Extract data for chart
    jsonData.forEach(item => {
      const date = item.TANGGAL;
      const minDebit = item['MIN DEBIT'];
      const maxCredit = item['MAX CREDIT'];

      // Check if valid data exists and format it
      if (date && minDebit && maxCredit) {
        const minDebitValue = parseFloat(minDebit.trim().replace(',', ''));
        const maxCreditValue = parseFloat(maxCredit.trim().replace(',', ''));

        if (!isNaN(minDebitValue) && !isNaN(maxCreditValue)) {
          labels.push(date);
          minDebitData.push(minDebitValue);
          maxCreditData.push(maxCreditValue);
        }
      }
    });

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Min Debit',
          data: minDebitData,
          backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red for Min Debit
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'Max Credit',
          data: maxCreditData,
          backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue for Max Credit
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }
      ]
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
            // Format tooltip value as IDR (with all decimals)
            return tooltipItem.dataset.label + ': ' + formatIDR(tooltipItem.raw);
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date (Tanggal)',  // Label for x-axis
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amount (IDR)',  // Label for y-axis
        },
        ticks: {
          callback: function (value) {
            // Format y-axis values as IDR (with all decimals)
            return formatIDR(value);
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
