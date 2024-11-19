import React from 'react';
import { Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import balanceData from '../Transaction.json'; // Importing the new JSON data
import analysisKoran from '../JSON/AnalisaRekeningKoran.json'

// Utility function to safely parse a string and return a default value (0 if invalid)
const parseSafeFloat = (value) => {
  if (typeof value !== 'string' || value.trim() === '') {
    console.log('Returning 0 because value is invalid or empty:', value); // Debugging log
    return 0; // Return 0 if the value is not a valid string
  }
  // Try to remove non-numeric characters and parse the value
  const cleanedValue = value.replace(/[^0-9.-]+/g, "");

  // Log the cleaned value before parsing
  console.log('Cleaned value:', cleanedValue);

  const parsedValue = parseFloat(cleanedValue);

  // Log the parsed value to ensure it is correct
  console.log('Parsed value:', parsedValue);

  return isNaN(parsedValue) ? 0 : parsedValue;
};

const AnalyticsDashboardBalance = () => {
  // Extract the static data from the JSON, trim spaces from the key names
  const totalDebit = parseSafeFloat(analysisKoran.find(item => item.Description && item.Description.trim() === "Total Mutasi Debit")?.["Value "]);
  const totalCredit = parseSafeFloat(analysisKoran.find(item => item.Description && item.Description.trim() === "Total Mutasi Kredit")?.["Value "]);
  const highestBalance = parseSafeFloat(analysisKoran.find(item => item.Description && item.Description.trim() === "Saldo Tertinggi")?.["Value "]);
  const lowestBalance = parseSafeFloat(analysisKoran.find(item => item.Description && item.Description.trim() === "Saldo Terendah")?.["Value "]);
  const avgBalance = parseSafeFloat(analysisKoran.find(item => item.Description && item.Description.trim() === "Saldo Rata-Rata")?.["Value "]);

  // Process data for chart rendering
  const chartData = balanceData.map(item => ({
    date: item.date,
    balance: parseSafeFloat(item.balance) // Convert balance to a number
  }));

  // Ensure valid data for the chart
  const isValidData = chartData.length > 0 && chartData.every(item => item.balance !== undefined);

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <div className="p-4 space-y-6">
          <Section
            title="Balance Trend"
            description="Account balance progression over the selected time frame"
            icon={<Info size={16} />}
          >
            {/* Only render chart if data is valid */}
            {isValidData ? (
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p>No valid data available to display the chart.</p> // Fallback message if data is invalid
            )}
          </Section>

          <Section title="Balance Statistics" icon={<Info size={16} />}>
            <div className="grid grid-cols-4 gap-6">
              <SummaryCard
                title="Average Balance"
                value={formatCurrency(avgBalance.toFixed(2))}
              />
              <SummaryCard
                title="Highest Balance"
                value={formatCurrency(highestBalance.toFixed(2))}
                textColor="text-green-600"
              />
              <SummaryCard
                title="Lowest Balance"
                value={formatCurrency(lowestBalance.toFixed(2))}
                textColor="text-red-600"
              />
              <SummaryCard
                title="Balance Growth"
                value={getBalanceGrowth(chartData)}
                textColor="text-green-600"
              />
            </div>
          </Section>

          <Section title="Daily Balance" icon={<Info size={16} />}>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-1 text-right">Date</th>
                    <th className="px-2 py-1 text-left">Description</th>
                    <th className="px-2 py-1 text-right">Opening Balance</th>
                    <th className="px-2 py-1 text-right">Closing Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {balanceData.map((item, index) => {
                    const mutationFormatted = formatCurrency(item.mutation);
                    const openingBalanceFormatted = formatCurrency(item.balance);
                    // Get the closing balance as the balance from the next row
                    const closingBalanceFormatted = formatCurrency(
                      (balanceData[index + 1]?.balance) ? balanceData[index + 1]?.balance : item.balance
                    );
                    return (
                      <tr key={index} className="border-t">
                        <td className="px-2 py-1 text-right">{item.date}</td>
                        <td className="px-2 py-1">{item.description}</td>
                        <td className="px-2 py-1 text-right">{openingBalanceFormatted}</td>
                        <td className="px-2 py-1 text-right">{closingBalanceFormatted}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};

// Utility function to format currency with a fallback value
const formatCurrency = (value) => {
  if (!value) return '0.00'; // Return '0.00' if value is undefined or null
  return value.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
};

// Utility function to calculate average balance
const getAverageBalance = (data) => {
  const total = data.reduce((sum, item) => sum + item.balance, 0);
  const average = total / data.length;
  return formatCurrency(average.toFixed(2));
};

// Utility function to get highest balance
const getHighestBalance = (data) => {
  const highest = Math.max(...data.map(item => item.balance));
  return formatCurrency(highest.toFixed(2));
};

// Utility function to get lowest balance
const getLowestBalance = (data) => {
  const lowest = Math.min(...data.map(item => item.balance));
  return formatCurrency(lowest.toFixed(2));
};

// Utility function to calculate balance growth
const getBalanceGrowth = (data) => {
  const firstBalance = data[0].balance;
  const lastBalance = data[data.length - 1].balance;
  const growth = ((lastBalance - firstBalance) / firstBalance) * 100;
  return `${growth.toFixed(2)}%`;
};

const Section = ({ title, description, icon, children }) => (
  <div className="bg-white rounded-lg p-4 shadow-lg">
    <div className="flex items-center space-x-2 mb-2">
      <h2 className="text-lg font-medium">{title}</h2>
      {icon}
    </div>
    {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
    {children}
  </div>
);

const SummaryCard = ({ title, value, textColor = "text-gray-900" }) => (
  <div>
    <div className="text-sm text-gray-600 mb-1">{title}</div>
    <div className={`text-lg font-medium ${textColor}`}>{value}</div>
  </div>
);

export default AnalyticsDashboardBalance;
