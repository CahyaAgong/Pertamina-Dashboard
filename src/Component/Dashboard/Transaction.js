import React from 'react';
import { Bell, HelpCircle, Settings, Home, Upload, FileText, Layout, PieChart, Download } from 'lucide-react';

const TransactionDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">


      {/* Main Content */}
      <div className="flex-1 p-8">


        {/* Transaction Behavior Content */}
        <div className="space-y-8">
          {/* ATM Transactions */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">ATM Transactions</h3>
              <button className="text-blue-600">Get Help</button>
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

          {/* Outlier Transactions */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Outlier Transactions</h3>
              <button className="text-blue-600">Get Help</button>
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
                {outlierData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">{item.date}</td>
                    <td>{item.detail}</td>
                    <td>{item.debit || '-'}</td>
                    <td>{item.credit || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">Show 1-5 from 6 transaction</div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
                <button className="px-3 py-1 text-gray-600 rounded">2</button>
                <button className="px-3 py-1 text-gray-600 rounded">→</button>
              </div>
            </div>
          </div>

          {/* Weekend Spending */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Spending on the Weekend</h3>
              <div className="flex space-x-2">
                <button className="px-4 py-1 bg-blue-600 text-white rounded">Table</button>
                <button className="px-4 py-1 text-gray-600 rounded">Graph</button>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-4">Identify fraudulent transactions tracked by irregular spending on the weekend</p>
            <table className="w-full">
              <thead className="text-left">
                <tr className="border-b">
                  <th className="pb-2">MONTH</th>
                  <th className="pb-2">TRANSACTION VALUE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3">July 2023</td>
                  <td>1,564,568</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, active }) => (
  <div className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
    {icon}
    <span>{text}</span>
  </div>
);

const Tab = ({ text, active }) => (
  <div className={`pb-4 px-2 cursor-pointer ${active ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>
    {text}
  </div>
);

// Sample data for outlier transactions
const outlierData = [
  { date: '01 July 2023', detail: 'NINA NURSITA', debit: '', credit: '1,365,000' },
  { date: '01 July 2023', detail: 'NINA NURSITA', debit: '', credit: '241,200' },
  { date: '10 July 2023', detail: 'NINA NURSITA', debit: '', credit: '300,000' },
  { date: '26 July 2023', detail: 'NINA NURSITA', debit: '', credit: '2,200,000' },
  { date: '28 July 2023', detail: '-', debit: '265,000', credit: '' },
];

export default TransactionDashboard;