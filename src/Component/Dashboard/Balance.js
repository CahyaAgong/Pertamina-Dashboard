import React from 'react';
import {
  Home, Upload, FileText, Layout, PieChart,
  HelpCircle, Download, Settings, Bell,
  Trash2, Filter, Edit, BarChart2,
  Info, ChevronRight, FileUp
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SidebarLayout from '../Sidebar/Layout';

const AnalyticsDashboardBalance = () => {
  // Sample data for the balance chart
  const balanceData = [
    { date: '07/01', balance: 0.65 },
    { date: '07/05', balance: 450000.25 },
    { date: '07/10', balance: 680500.45 },
    { date: '07/15', balance: 820300.90 },
    { date: '07/20', balance: 950400.30 },
    { date: '07/25', balance: 1020500.75 },
    { date: '07/30', balance: 1080655.65 }
  ];

  return (
    <>
      {/* Main Content */}
      <div className="flex-1">
        {/* Header section - Same as previous */}



        {/* Balance Overview Content */}
        <div className="p-4 space-y-6">
          <Section
            title="Balance Trend"
            description="Account balance movement over the selected period"
            icon={<Info size={16} />}
          >
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={balanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Section>

          <Section title="Balance Statistics" icon={<Info size={16} />}>
            <div className="grid grid-cols-4 gap-8">
              <SummaryCard title="Average Balance" value="750,655.65" />
              <SummaryCard title="Highest Balance" value="1,080,655.65" textColor="text-green-600" />
              <SummaryCard title="Lowest Balance" value="0.65" textColor="text-red-600" />
              <SummaryCard title="Balance Growth" value="+108.06%" textColor="text-green-600" />
            </div>
          </Section>

          <Section title="Daily Balance" icon={<Info size={16} />}>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Opening Balance</th>
                  <th className="px-4 py-2 text-left">Closing Balance</th>
                  <th className="px-4 py-2 text-left">Daily Change</th>
                </tr>
              </thead>
              <tbody>
                {balanceData.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">{item.balance.toLocaleString()}</td>
                    <td className="px-4 py-2">{(item.balance + 1000).toLocaleString()}</td>
                    <td className="px-4 py-2 text-green-600">+1,000.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  <div className="bg-white rounded-lg p-6">
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