import React from 'react';
import {
  Info
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import balanceData from '../Balance.json'; // Importing the JSON data

const AnalyticsDashboardBalance = () => {

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        {/* Header section - Same as previous */}

        {/* Balance Overview Content */}
        <div className="p-4 space-y-6">
          <Section
            title="Balance Trend"
            description="Account balance movement over the selected period"
            icon={<Info size={16} />}
          >
            <div className="h-72 w-full "> {/* Reduced height */}
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={balanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} /> {/* Smaller font size for x-axis */}
                  <YAxis tick={{ fontSize: 10 }} /> {/* Smaller font size for y-axis */}
                  <Tooltip />
                  <Line type="monotone" dataKey="max_balance" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Section>

          <Section title="Balance Statistics" icon={<Info size={16} />}>
            <div className="grid grid-cols-4 gap-6"> {/* Reduced gap */}
              <SummaryCard title="Average Balance" value="750,655.65" />
              <SummaryCard title="Highest Balance" value="1,080,655.65" textColor="text-green-600" />
              <SummaryCard title="Lowest Balance" value="0.65" textColor="text-red-600" />
              <SummaryCard title="Balance Growth" value="+108.06%" textColor="text-green-600" />
            </div>
          </Section>

          <Section title="Daily Balance" icon={<Info size={16} />}>
            <div className="overflow-x-auto"> {/* Make the table scrollable */}
              <table className="w-full text-xs"> {/* Smaller text size */}
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-1 text-left">Date</th> {/* Reduced padding */}
                    <th className="px-2 py-1 text-left">Opening Balance</th>
                    <th className="px-2 py-1 text-left">Closing Balance</th>
                    <th className="px-2 py-1 text-left">Daily Change</th>
                  </tr>
                </thead>
                <tbody>
  {balanceData.map((item, index) => {
    const dailyChange = item.min_balance - item.max_balance; // Calculate the daily change
    const dailyChangeFormatted = dailyChange > 0 ? `+${dailyChange.toLocaleString()}` : dailyChange.toLocaleString(); // Format the change with a "+" or just the value
    return (
      <tr key={index} className="border-t">
        <td className="px-2 py-1">{item.date}</td>
        <td className="px-2 py-1">{item.max_balance.toLocaleString()}</td>
        <td className="px-2 py-1">{item.min_balance.toLocaleString()}</td> {/* Display min_balance */}
        {/* <td className="px-2 py-1">{(item.max_balance).toLocaleString()}</td> Display max_balance */}
        <td className="px-2 py-1 text-green-600">{dailyChangeFormatted}</td> {/* Display the daily change */}
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

// Reuse the same component definitions
const SidebarItem = ({ icon, text, active }) => (
  <div className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
    {icon}
    <span>{text}</span>
  </div>
);

const TabItem = ({ text, active }) => (
  <button className={`px-4 py-2 border-b-2 ${active ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}>
    {text}
  </button>
);

const Section = ({ title, description, icon, children }) => (
  <div className="bg-white rounded-lg p-4 shadow-lg"> {/* Reduced padding */}
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
