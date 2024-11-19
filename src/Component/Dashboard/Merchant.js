import React, { useState, useEffect } from 'react';
import { Bell, ChevronLeft, HelpCircle, Settings, Home, Upload, FileText, Layout, PieChart, Download } from 'lucide-react';
import transactionData from '../JSON/DetailKriteria.json';

const MerchantDashboard = () => {

  // Function to filter and extract only "Adidas" from KETERANGAN
  const extractAdidasOnly = (keterangan) => {
    // Check if 'Adidas' is part of KETERANGAN, return only "Adidas" if found
    if (keterangan && keterangan.toLowerCase().includes("adidas")) {
      return "Adidas"; // Display only "Adidas"
    }
    return ""; // If not Adidas, return an empty string
  }

  // Filter data where KETERANGAN contains "Adidas"
  const filteredData = transactionData.filter(item => item.KETERANGAN && item.KETERANGAN.toLowerCase().includes("adidas"));

  // Calculate total amount for Adidas related transactions (both debit and credit)
  const totalAdidasAmount = filteredData.reduce((acc, curr) => {
    const amount = curr.MUTASI ? parseFloat(curr.MUTASI.split(" ")[0].replace(/,/g, '')) : 0;
    return acc + amount;
  }, 0);

  // Filter for Outgoing Funds (Credit/CR transactions)
  const outgoingFunds = transactionData.filter(item => item.MUTASI && item.MUTASI.includes("CR"));

  // Calculate total amount for Outgoing Funds (Credit)
  const totalOutgoingFunds = outgoingFunds.reduce((acc, curr) => {
    const amount = curr.MUTASI ? parseFloat(curr.MUTASI.split(" ")[0].replace(/,/g, '')) : 0;
    return acc + amount;
  }, 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1">
        {/* Profile Section */}
        <div className="p-8">
          {/* Merchant Analysis Content */}
          <div className="grid grid-cols-2 gap-6">

            {/* Adidas Transactions */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Incoming Transactions</h3>
              <p className="text-gray-500 text-sm mb-4">
                Organizes all Incoming transactions.
              </p>
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-4">TRANSACTION DESCRIPTION</th>
                    <th className="pb-4 text-right">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 text-blue-600">{extractAdidasOnly(item.KETERANGAN)}</td>
                      <td className="text-right">{item.MUTASI ? item.MUTASI.split(" ")[0] : "0.00"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>Show {filteredData.length} Transactions</span>
                <span className="bg-blue-600 text-white px-2 py-1 rounded">{totalAdidasAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Outgoing Funds */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Outgoing Funds</h3>
              <p className="text-gray-500 text-sm mb-4">
                Presents a detailed analysis of outflows related to your expenditures.
              </p>
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-4">TRANSACTION TARGET</th>
                    <th className="pb-4 text-right">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {outgoingFunds.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 text-blue-600">{extractAdidasOnly(item.KETERANGAN)}</td>
                      <td className="text-right">{item.MUTASI ? item.MUTASI.split(" ")[0] : "0.00"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>Show {outgoingFunds.length} Outgoing Transactions</span>
                <span className="bg-blue-600 text-white px-2 py-1 rounded">{totalOutgoingFunds.toLocaleString()}</span>
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
