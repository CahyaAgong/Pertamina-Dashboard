import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2'; // Import Bar chart component
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Import required chart.js elements
import { Bell, HelpCircle, Settings, Home, Upload, FileText, Layout, PieChart, Download } from 'lucide-react';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Your original JSON data
const outlierData = [
  { "Date": "01/05", "KETERANGAN": "SALDO AWAL", "MUTASI": null, "SALDO": "-564,845,718.45" },
  { "Date": "02/05", "KETERANGAN": "TRSF E-BANKING DB 0205/FTSCY/WS90671 135154282.00 PEMBAYARAN PAJAK", "MUTASI": "135,154,282.00 DB", "SALDO": "-700,000,000.45" },
  { "Date": "03/05", "KETERANGAN": "TRSF E-BANKING DB 0205/FTSCY/WS90671  300000000.00 DENDA", "MUTASI": "300,000,000.00 DB", "SALDO": "-1,000,000,000.45" },
  { "Date": "06/05", "KETERANGAN": "TRSF E-BANKING DB 0205/FTSCY/WS90671  100000000.00 bkl HENRY S H", "MUTASI": "100,000,000.00", "SALDO": "-900,000,000.45" },
  { "Date": "13/05", "KETERANGAN": "TRSF E-BANKING DB 0205/FTSCY/WS90671  TANGGAL :12/05 50000000.00 HENRY S H", "MUTASI": "50,000,000.00 DB", "SALDO": "-950,000,000.45" },
  { "Date": "21/05", "KETERANGAN": "TRSF E-BANKING DB 0205/FTSCY/WS90671   300000000.00 rk ka HENRY S H", "MUTASI": "300,000,000.00", "SALDO": null },
  { "Date": "22/05", "KETERANGAN": "TRSF E-BANKING DB 0205/FTSCY/WS90671   250000000.00 Adidas", "MUTASI": "250,000,000.00", "SALDO": "-430,000,000.45" },
  { "Date": "24/05", "KETERANGAN": "TRSF E-BANKING DB 0205/FTSCY/WS90671   30000000.00 rk gn HENRY S H", "MUTASI": "30,000,000.00 DB", "SALDO": "-460,000,000.45" },
  { "Date": "27/05", "KETERANGAN": "PEMBAYARAN PINJ. 2588390000 BUNGA KREDIT LOKAL", "MUTASI": "8,011,421.74 DB", "SALDO": "-468,011,422.19" },
  { "Date": "31/05", "KETERANGAN": "BIAYA ADM ", "MUTASI": "30,000.00 DB", "SALDO": "-468,041,422.19" }
];

// Filter only ATM-related transactions based on a simple condition
const filteredAtmTransactions = outlierData.filter(item => item.MUTASI !== null);

// TransactionDashboard component
const TransactionDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Track number of records per page

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAtmTransactions.slice(indexOfFirstItem, indexOfLastItem);

  // Handle changes in the number of items per page
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value)); // Update items per page
    setCurrentPage(1); // Reset to first page when the number of items per page changes
  };

  // Format amounts to IDR currency
  const formatIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* ATM Transactions */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">ATM Transactions</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">Records both cash withdrawals and deposits, offering insights into ATM cash flow transactions.</p>
          <table className="w-full">
            <thead className="text-left">
              <tr className="border-b">
                <th className="pb-2">TRANSACTION</th>
                <th className="pb-2">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 text-blue-600">{item.KETERANGAN}</td>
                  <td>{formatIDR(item.MUTASI)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredAtmTransactions.length)} of {filteredAtmTransactions.length} transactions
            </div>
            <div className="flex space-x-2">
              <button onClick={() => setCurrentPage(currentPage - 1)} className="px-3 py-1 text-gray-600 rounded" disabled={currentPage === 1}>← Previous</button>
              <button onClick={() => setCurrentPage(currentPage + 1)} className="px-3 py-1 text-gray-600 rounded" disabled={currentPage === Math.ceil(filteredAtmTransactions.length / itemsPerPage)}>Next →</button>
            </div>
          </div>
        </div>

        {/* Bar Chart for Debit/Credit Analysis */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Debit and Credit Amounts by Date</h3>
          <Bar data={{
            labels: filteredAtmTransactions.map(item => item.Date), // Dates as x-axis labels
            datasets: [
              {
                label: 'Debit Amount',
                data: filteredAtmTransactions.map(item => parseFloat(item.MUTASI.split(" ")[0].replace(/,/g, ''))), // Extract debit amount from MUTASI field
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          }} options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Debit and Credit Transactions by Date'
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.dataset.label}: ${context.raw.toLocaleString()} IDR`
                }
              }
            }
          }} />
        </div>
      </div>
    </div>
  );
};

export default TransactionDashboard;
