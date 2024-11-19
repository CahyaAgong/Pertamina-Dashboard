import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import data from '../JSON/DetailKriteria.json';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DynamicLineChart = () => {
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

  // Function to format numbers as IDR without rounding and showing all decimals
  const formatIDR = (number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,  // Ensure at least two decimal places
      maximumFractionDigits: 20  // Allow up to 20 decimal places
    }).format(number);
  };

  useEffect(() => {
    const labels = [];
    const balanceData = [];
    const dateBalanceMap = {};

    // Process the data
    data.forEach(item => {
      const date = item.TANGGAL;
      let balance = item.SALDO;

      // Check if 'SALDO' exists and is a string before processing
      if (date && balance && typeof balance === 'string') {
        // Clean the balance: remove commas and trim spaces, then parse to float
        balance = parseFloat(balance.trim().replace(',', ''));

        // Check if balance is valid and store the latest balance for each date
        if (!isNaN(balance)) {
          dateBalanceMap[date] = balance;
        } else {
          console.warn(`Invalid balance value: ${balance} for date: ${date}`);
        }
      } else {
        console.warn(`Missing or malformed data for date: ${date}`);
      }
    });

    // Now create the arrays for the chart
    const uniqueDates = Object.keys(dateBalanceMap);

    if (uniqueDates.length === 0) {
      console.warn('No valid data to display on the chart.');
    }

    uniqueDates.sort((a, b) => {
      const [dayA, monthA] = a.split('/').map(Number);
      const [dayB, monthB] = b.split('/').map(Number);
      return monthA - monthB || dayA - dayB;
    });

    uniqueDates.forEach(date => {
      labels.push(date);
      balanceData.push(dateBalanceMap[date]);
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
            // Format y-axis values as IDR (with all decimals)
            return formatIDR(value);
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-7xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">Balance Over Time</h3>
      {chartData.labels.length === 0 ? (
        <div>No data available for the chart</div>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default DynamicLineChart;
