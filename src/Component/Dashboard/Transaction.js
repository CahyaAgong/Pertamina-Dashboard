import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Import Bar chart component
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Import required chart.js elements
// import { format } from 'date-fns'; // Untuk format tanggal jika perlu
import DetailKriteria from '../JSON/DetailKriteria.json';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Fungsi untuk mengambil bagian yang relevan dari KETERANGAN
const extractKeterangan = (keterangan) => {
  const regex = /(PEMBAYARAN PAJAK|DENDA|BUNGA KREDIT LOKAL|BIAYA ADM|SANITIZER|PLN PREPAID|OBAT|PAJAK)/i; // Daftar kata yang relevan
  const match = keterangan.match(regex); // Mencocokkan dengan regex
  return match ? match[0] : keterangan; // Kembalikan hasil yang cocok, atau seluruh string jika tidak ada yang cocok
}

// Filter hanya transaksi yang sesuai dengan kata kunci
const filteredAtmTransactions = DetailKriteria.filter(item => 
  item.KETERANGAN && (
    item.KETERANGAN.includes("BUNGA KREDIT LOKAL") ||
    item.KETERANGAN.includes("BIAYA ADM") ||
    item.KETERANGAN.includes("PEMBAYARAN PAJAK") ||
    item.KETERANGAN.includes("PAJAK")

  )
);

// Mengelompokkan transaksi berdasarkan KETERANGAN dan menghitung total MUTASI untuk setiap kategori
const groupedByKeterangan = filteredAtmTransactions.reduce((acc, item) => {
  const keterangan = extractKeterangan(item.KETERANGAN); // Ambil KETERANGAN yang sudah difilter
  const mutasi = item.MUTASI ? parseFloat(item.MUTASI.replace(/[^0-9.-]+/g, "")) : 0; // Ambil nilai MUTASI, pastikan ini adalah angka

  if (!acc[keterangan]) {
    acc[keterangan] = 0; // Jika kategori belum ada, inisialisasi dengan 0
  }
  acc[keterangan] += mutasi; // Tambahkan nilai MUTASI ke kategori yang sesuai

  return acc;
}, {});

const chartLabels = Object.keys(groupedByKeterangan); // Kategorinya (KETERANGAN)
const chartData = Object.values(groupedByKeterangan); // Total mutasi untuk setiap kategori

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

  // Safely parse MUTASI to prevent errors from null or invalid data
  const safeParseMutasi = (mutasi) => {
    if (mutasi && typeof mutasi === 'string') {
      const amount = mutasi.split(" ")[0].replace(/,/g, ''); // Extract the numeric part
      return parseFloat(amount) || 0; // Return 0 if parsing fails
    }
    return 0; // Default to 0 if MUTASI is null or invalid
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
                  <td className="py-3 text-blue-600">{extractKeterangan(item.KETERANGAN)}</td>
                  <td>
                    {item.MUTASI ? formatIDR(safeParseMutasi(item.MUTASI)) : "-"}
                  </td>
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
          <h3 className="text-lg font-semibold mb-4">Transaction Amounts by Category</h3>
          <Bar 
            data={{
              labels: chartLabels, // Keterangan sebagai label pada sumbu X
              datasets: [{
                label: 'Total Amount',
                data: chartData, // Data jumlah untuk setiap kategori KETERANGAN
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              }]
            }} 
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Transaction Amounts by Category'
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw.toLocaleString()} IDR`
                  }
                }
              }
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionDashboard;
