import React, { useState, useEffect } from 'react';
import { Bell, ChevronLeft, HelpCircle, Settings, Home, Upload, FileText, Layout, PieChart, Download } from 'lucide-react';
import transactionData from '../JSON/DetailKriteria.json';

const MerchantDashboard = () => {
  // Function to filter and extract only "PLN" from KETERANGAN
  const extractPLNOnly = (keterangan) => {
    // Check if 'PLN' is part of KETERANGAN, return only "PLN" if found
    if (keterangan && keterangan.toLowerCase().includes("pln")) {
      return "PLN"; // Display only "PLN"
    }
    return ""; // If not PLN, return an empty string
  }

  // Filter data where KETERANGAN contains "PLN" for Outgoing Funds (Credit transactions)
  const outgoingFunds = transactionData.filter(item => 
    item.KETERANGAN && 
    item.KETERANGAN.toLowerCase().includes("pln") && 
    item.MUTASI
  );

  // Calculate total amount for Outgoing Funds (Credit)
  const totalOutgoingFunds = outgoingFunds.reduce((acc, curr) => {
    const amount = curr.MUTASI ? parseFloat(curr.MUTASI.split(" ")[0].replace(/,/g, '')) : 0;
    return acc + amount;
  }, 0);

  // Filter for Incoming Funds (Debit transactions)
  const incomingFunds = transactionData.filter(item => 
    item.KETERANGAN && 
    item.KETERANGAN.toLowerCase().includes("pln") && 
    item.MUTASI && 
    item.MUTASI.toLowerCase().includes("dr") // Ensure this is a Debit (Incoming) transaction
  );

  // Calculate total amount for Incoming Funds (Debit)
  const totalIncomingFunds = incomingFunds.reduce((acc, curr) => {
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

            {/* Incoming Funds */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Incoming Transactions</h3>
              <p className="text-gray-500 text-sm mb-4">
                Organizes all incoming transactions (Debit).
              </p>
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-4">TRANSACTION SOURCE</th>
                    <th className="pb-4 text-right">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {incomingFunds.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 text-blue-600">{extractPLNOnly(item.KETERANGAN)}</td>
                      <td className="text-right">{item.MUTASI ? item.MUTASI.split(" ")[0] : "0.00"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>Show {incomingFunds.length} Incoming Transactions</span>
                <span className="bg-blue-600 text-white px-2 py-1 rounded">{totalIncomingFunds.toLocaleString()}</span>
              </div>
            </div>

            {/* Outgoing Funds */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Outgoing Funds</h3>
              <p className="text-gray-500 text-sm mb-4">
                Presents a detailed analysis of outflows related to your PLN expenditures (Credit).
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
                      <td className="py-2 text-blue-600">{extractPLNOnly(item.KETERANGAN)}</td>
                      <td className="text-right">{item.MUTASI ? item.MUTASI.split(" ")[0] : "0.00"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>Show {outgoingFunds.length} Outgoing PLN Transactions</span>
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
