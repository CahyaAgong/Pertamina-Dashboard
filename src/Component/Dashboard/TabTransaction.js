import React from 'react';
import { Info } from 'lucide-react';
import transactionData from '../Rekening.json';

const AnalyticsTransaction = () => {
  // Dynamically extract values for Credit and Debit Transactions
  const creditTransactionTotal = transactionData.find(item => item.header === 'Total Credit Transactions')?.value || 0;
  const debitTransactionTotal = transactionData.find(item => item.header === 'Total Debit Transactions')?.value || 0;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1">

        {/* Analysis Sections */}
        <div className="p-4 space-y-6">
          {/* Fraud Detection */}
          <Section
            title="Fraud Detection"
            description="We identified multiple issues concerning the uploaded files. Please note that these files might contain fraudulent information which requires your immediate attention."
            icon={<Info size={16} />}
          >
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">NO</th>
                  <th className="px-4 py-2 text-left">INDICATOR</th>
                  <th className="px-4 py-2 text-left">VALUE</th>
                  <th className="px-4 py-2 text-left">BANK ACCOUNT</th>
                  <th className="px-4 py-2 text-left">STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">Account Number</td>
                  <td className="px-4 py-2">5170384719</td>
                  <td className="px-4 py-2">BCA - 5170384719</td>
                  <td className="px-4 py-2">
                    <span className="text-blue-600">Active</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Transaction Summary */}
          <Section
            title="Transaction Summary"
            icon={<Info size={16} />}
          >
            <div className="grid grid-cols-4 gap-8">
              {transactionData.map((item, index) => (
                <SummaryCard
                  key={index}
                  title={item.header}
                  value={item.value.toLocaleString()} // Format angka jika perlu
                  textColor={item.textColor || "text-gray-900"}
                />
              ))}
            </div>
          </Section>

          {/* Transaction Details */}
          <Section
            title="Transaction Detail"
            icon={<Info size={16} />}
          >
            <div className="grid grid-cols-2 gap-8">
              {/* Credit Transactions */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="font-medium mb-2">Credit Transaction Breakdown</h3>
                <p className="text-sm text-gray-500 mb-4">Total revenue breakdown based on available data</p>
                <div className="relative w-48 h-48 mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{creditTransactionTotal.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">Total</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Debit Transactions */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="font-medium mb-2">Debit Transaction Breakdown</h3>
                <p className="text-sm text-gray-500 mb-4">Overall cost breakdown based on available data</p>
                <div className="relative w-48 h-48 mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{debitTransactionTotal.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">Total</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
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

const TabItem = ({ text, active }) => (
  <button className={`px-4 py-2 border-b-2 ${active ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}>
    {text}
  </button>
);

const Section = ({ title, description, icon, children }) => (
  <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
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

export default AnalyticsTransaction;
