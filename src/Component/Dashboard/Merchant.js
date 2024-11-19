import React from 'react';
import { Bell, ChevronLeft, HelpCircle, Settings, Home, Upload, FileText, Layout, PieChart, Download } from 'lucide-react';

const MerchantDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}

        {/* Profile Section */}
        <div className="p-8">

          {/* Merchant Analysis Content */}
          <div className="grid grid-cols-2 gap-6">
            {/* Incoming Fund */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Incoming Fund</h3>
              <p className="text-gray-500 text-sm mb-4">
                Categorizes earnings, providing a clear breakdown of revenue streams from each business partner or sales outlet
              </p>
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-4">MERCHANT</th>
                    <th className="pb-4 text-right"># OF TRANSACTION</th>
                    <th className="pb-4 text-right">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 text-blue-600">NINA NURSITA</td>
                    <td className="pl-10 text-right">4</td>
                    <td className="text-right">4.126.200</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-blue-600">RESLA PUTR</td>
                    <td className="text-right">1</td>
                    <td className="text-right">116.500</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-blue-600">HAFIZH RAFIZ</td>
                    <td className="text-right">1</td>
                    <td className="text-right">100.000</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-blue-600">NURDELA ARDI</td>
                    <td className="text-right">1</td>
                    <td className="text-right">65.000</td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>Show 1-4 From 4 Files</span>
                <span className="bg-blue-600 text-white px-2 py-1 rounded">1</span>
              </div>
            </div>

            {/* Outgoing Funds */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Outgoing Funds</h3>
              <p className="text-gray-500 text-sm mb-4">
                Delivers a concise analysis of outgoings, detailing your spending patterns across individual vendors or service providers
              </p>
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-4">MERCHANT</th>
                    <th className="pb-4 text-right"># OF TRANSACTION</th>
                    <th className="pb-4 text-right">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 text-blue-600">NONE</td>
                    <td className="text-right">38</td>
                    <td className="text-right">2.877.045</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-blue-600">CENAIDA</td>
                    <td className="text-right">6</td>
                    <td className="text-right">327.500</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-blue-600">BNINDIA</td>
                    <td className="text-right">2</td>
                    <td className="text-right">122.500</td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>Show 1-3 From 3 Files</span>
                <span className="bg-blue-600 text-white px-2 py-1 rounded">1</span>
              </div>
            </div>
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

const TabButton = ({ text, active }) => (
  <button className={`py-4 px-1 ${active ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
    {text}
  </button>
);

const Field = ({ label, value }) => (
  <div>
    <div className="text-gray-500 text-sm">{label}</div>
    <div className="font-medium">{value}</div>
  </div>
);

export default MerchantDashboard;
