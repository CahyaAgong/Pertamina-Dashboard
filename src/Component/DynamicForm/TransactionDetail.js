import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Info } from 'lucide-react';

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

  // Chart data for Debit Frequency (Doughnut Chart)
  const debitChartData = {
    labels: ['Debit Frequency'],
    datasets: [
      {
        data: [frequencyDebit], // Only show the Debit Frequency value
        backgroundColor: ['#34D399'], // Green for Debit
        borderWidth: 1,
      },
    ],
  };

  // Chart data for Credit Frequency (Doughnut Chart)
  const creditChartData = {
    labels: ['Credit Frequency'],
    datasets: [
      {
        data: [frequencyCredit], // Only show the Credit Frequency value
        backgroundColor: ['#1E3A8A'], // Blue for Credit
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        {/* Debit Frequency Doughnut Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="font-medium mb-2">Debit Frequency</h3>
          <p className="text-sm text-gray-500 mb-4">Debit Transaction Frequency Overview</p>
          <div className="relative w-48 h-48 mx-auto">
            <Doughnut data={debitChartData} options={{ responsive: true }} />
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            <p><strong>Debit Frequency:</strong> {frequencyDebit} %</p>
          </div>
        </div>

        {/* Credit Frequency Doughnut Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="font-medium mb-2">Credit Frequency</h3>
          <p className="text-sm text-gray-500 mb-4">Credit Transaction Frequency Overview</p>
          <div className="relative w-48 h-48 mx-auto">
            <Doughnut data={creditChartData} options={{ responsive: true }} />
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            <p><strong>Credit Frequency:</strong> {frequencyCredit} %</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
