import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components for charting
ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionDetail = ({ data }) => {
  // Function to safely convert values to numbers after cleaning strings (removing commas, currency symbols)
  const parseValue = (value) => {
    if (typeof value === 'string') {
      // Remove all non-numeric characters except the decimal point and minus sign
      return parseFloat(value.replace(/[^\d.-]/g, '')) || 0;
    }
    return value || 0;
  };

  // Extracting transaction data from JSON, ensuring proper trimming of spaces around the keys
  const frequencyDebit = parseInt(data.find(item => item.Description.trim() === "Frekuensi Mutasi Debit")?.["Value "] || 0);
  const frequencyCredit = parseInt(data.find(item => item.Description.trim() === "Frekuensi Mutasi Kredit")?.["Value "] || 0);

  // Total for normalization (if needed for percentage calculation)
  const total = frequencyDebit + frequencyCredit;

  // Chart data for both Debit and Credit Frequency (combined in one chart)
  const combinedChartData = {
    labels: ['Debit Frequency', 'Credit Frequency'],
    datasets: [
      {
        data: [frequencyDebit, frequencyCredit], // Both Debit and Credit Frequencies
        backgroundColor: ['#34D399', '#1E3A8A'], // Green for Debit, Blue for Credit
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h3 className="font-medium mb-2">Transaction Frequency Overview</h3>
        <p className="text-sm text-gray-500 mb-4">Overall Debit and Credit Frequency</p>
        <div className="relative w-72 h-72 mx-auto">
          <Doughnut data={combinedChartData} options={{ responsive: true }} />
        </div>
        <div className="mt-4 text-center text-sm text-gray-600">
          <p><strong>Debit Frequency:</strong> {frequencyDebit} %</p>
          <p><strong>Credit Frequency:</strong> {frequencyCredit} %</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
