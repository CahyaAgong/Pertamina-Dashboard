import React, { useState } from 'react';
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

// Your new Outlier data with debit and credit explicitly defined
const outlierData = [
  { "date": "01/05", "description": "SALDO AWAL", "branch": "", "mutation": "30,000.00 DB", "balance": "-468,041,422.19", "debit": 0.0, "credit": 0.0 },
  { "date": "02/05", "description": "TRSF E-BANKING DB 0205/FTSCY/WS95051135154282.00 rk HENRY SISWANTO HAD", "branch": "", "mutation": "135,154,282.00 DB", "balance": "-700,000,000.45", "debit": 135154282.00, "credit": 0.0 },
  { "date": "03/05", "description": "TRSF E-BANKING DB 0305/FTSCY/WS95051300000000.00 rk HENRY SISWANTO HAD", "branch": "", "mutation": "300,000,000.00 DB", "balance": "-1,000,000,000.45", "debit": 300000000.00, "credit": 0.0 },
  { "date": "06/05", "description": "TRSF E-BANKING CR 0605/FTSCY/WS95051100000000.00 bkl HENRY SISWANTO HAD", "branch": "", "mutation": "100,000,000.00", "balance": "-900,000,000.45", "debit": 0.0, "credit": 100000000.00 },
  { "date": "13/05", "description": "TRSF E-BANKING DB 1205/FTSCY/WS95051 TANGGAL :12/0550000000.00 HENRY SISWANTO HAD", "branch": "", "mutation": "50,000,000.00 DB", "balance": "-950,000,000.45", "debit": 50000000.00, "credit": 0.0 },
  { "date": "21/05", "description": "TRSF E-BANKING CR 2105/FTSCY/WS95051300000000.00 rk ka HENRY SISWANTO HAD", "branch": "", "mutation": "300,000,000.00", "balance": "", "debit": 30000000.00, "credit": 300000000.00 },
  { "date": "22/05", "description": "TRSF E-BANKING CR 2205/FTSCY/WS95051250000000.00 rk ka HENRY SISWANTO HAD", "branch": "", "mutation": "250,000,000.00", "balance": "-430,000,000.45", "debit": 0.0, "credit": 250000000.00 },
  { "date": "24/05", "description": "TRSF E-BANKING DB 2405/FTSCY/WS9505130000000.00 rk gn HENRY SISWANTO HAD", "branch": "", "mutation": "30,000,000.00 DB", "balance": "-460,000,000.45", "debit": 30000000.00, "credit": 0.0 },
  { "date": "27/05", "description": "PEMBAYARAN PINJ. 2588390000 BUNGA KREDIT LOKAL", "branch": "0258", "mutation": "8,011,421.74 DB", "balance": "-468,011,422.19", "debit": 8011421.74, "credit": 0.0 },
  { "date": "31/05", "description": "BIAYA ADM SALDO AWAL :", "branch": "-564,845,718.45", "mutation": "30,000.00 DB", "balance": "-564,845,718.45", "debit": 30000.00, "credit": 0.0 }
];

const TransactionDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Track number of records per page

  // Calculate the current items to display based on the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = outlierData.slice(indexOfFirstItem, indexOfLastItem);

  // Prepare data for Bar Chart (total debit values per date)
  const chartData = {
    labels: outlierData.map(item => item.date), // Dates as x-axis labels
    datasets: [
      {
        label: 'Debit Amount',
        data: outlierData.map(item => item.debit), // Use the debit field from the JSON data
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Credit Amount',
        data: outlierData.map(item => item.credit), // Use the credit field from the JSON data
        backgroundColor: 'rgba(153, 102, 255, 0.2)', // Another color for credit
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      }
    ],
  };

  // Change page
  const nextPage = () => {
    if (currentPage < Math.ceil(outlierData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle changes in the number of items per page
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value)); // Update items per page
    setCurrentPage(1); // Reset to first page when the number of items per page changes
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
          <p className="text-gray-500 text-sm mb-4">Tracks both cash withdrawals and deposits, offering a snapshot of cash flow activities at ATM machines.</p>
          <table className="w-full">
            <thead className="text-left">
              <tr className="border-b">
                <th className="pb-2">TRANSACTION</th>
                <th className="pb-2">AMOUNT</th>
                <th className="pb-2">TRANSACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 text-blue-600">Cash Deposits</td>
                <td>0</td>
                <td>-</td>
              </tr>
              <tr>
                <td className="py-3 text-blue-600">Cash Withdrawals</td>
                <td>0</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Outlier Transactions (with pagination) */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Outlier Transactions</h3>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={15}>15 per page</option>
                <option value={20}>20 per page</option>
              </select>
            </div>
            <p className="text-gray-500 text-sm mb-4">An outlier is defined as an observation that is significantly different from the other data in the set. The system can detect an unusual transaction amount and point it out to the user.</p>
            <table className="w-full">
              <thead className="text-left">
                <tr className="border-b">
                  <th className="pb-2">DATE</th>
                  <th className="pb-2">DETAIL</th>
                  <th className="pb-2">DEBIT</th>
                  <th className="pb-2">CREDIT</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">{item.date}</td>
                    <td>{item.description}</td>
                    <td>{item.debit.toLocaleString()}</td>
                    <td>{item.credit.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, outlierData.length)} of {outlierData.length} transactions</div>
              <div className="flex space-x-2">
                <button onClick={prevPage} className="px-3 py-1 text-gray-600 rounded" disabled={currentPage === 1}>← Previous</button>
                <button onClick={nextPage} className="px-3 py-1 text-gray-600 rounded" disabled={currentPage === Math.ceil(outlierData.length / itemsPerPage)}>Next →</button>
              </div>
            </div>
          </div>

          {/* Bar Chart Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Debit and Credit Amounts by Date</h3>
            <Bar data={chartData} options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Debit and Credit Transactions by Date'
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw.toLocaleString()}`
                  }
                }
              }
            }} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default TransactionDashboard;
