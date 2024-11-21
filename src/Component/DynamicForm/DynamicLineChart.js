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

  // Function to format numbers as IDR without rounding
  const formatIDR = (number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,  // Ensure at least two decimal places
      maximumFractionDigits: 2  // Ensure no more than two decimal places
    }).format(number);
  };

  useEffect(() => {
    const labels = [];
    const balanceData = [];
    const dateBalanceMap = {};

    // Ambil semua tanggal dari data
    data.forEach(item => {
      const date = item.TANGGAL;
      let balance = item.MUTASI;

      // Jika balance (MUTASI) tidak ada atau invalid, set ke 0.0
      if (date) {
        if (balance === null || balance === undefined || balance.trim() === "") {
          balance = 0.0; // Jika tidak ada data mutasi, tampilkan 0.0
        } else {
          // Pastikan saldo valid dengan menghapus koma dan mengubah ke angka
          balance = parseFloat(balance.trim().replace(',', '')) || 0.0;
        }

        // Menyimpan data per tanggal dengan nilai saldo terbaru
        dateBalanceMap[date] = { balance, date };
      } else {
        console.warn(`Data tidak valid pada tanggal: ${date}`);
      }
    });

    // Menambahkan tanggal yang unik dan memastikan semua tanggal ada di chart
    const uniqueDates = Object.keys(dateBalanceMap);

    // Menambahkan tanggal yang tidak ada di data (untuk menampilkan 0.0)
    const allDates = ['01/06', '03/06', '04/06']; // Contoh daftar tanggal yang diinginkan

    allDates.forEach(date => {
      if (!dateBalanceMap[date]) {
        dateBalanceMap[date] = { balance: 0.0, date }; // Jika tanggal tidak ada, set saldo ke 0.0
      }
    });

    // Urutkan tanggal dalam format yang benar (ascending order)
    const sortedDates = Object.keys(dateBalanceMap).sort((a, b) => {
      const [dayA, monthA, yearA] = a.split('/').map(Number);
      const [dayB, monthB, yearB] = b.split('/').map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return dateA - dateB;
    });

    // Populasi data chart
    sortedDates.forEach(date => {
      labels.push(date);
      balanceData.push(dateBalanceMap[date].balance);
    });

    // Set chartData
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
