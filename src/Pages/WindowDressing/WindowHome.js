import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import HeaderProfile from '../../Component/Card/HeaderProfile';
import SidebarLayout from '../../Component/Sidebar/Layout';
import profileData from '../../Component/Profile.json'
import firstJson from '../../Component/JSON/Estatement1.json'
import secondJson from '../../Component/JSON/Estatement2.json'

const WindowHome = () => {
  // Function to compare and render matching date transactions
  const renderMatchingTransactions = () => {
    // Create a set to keep track of already processed dates
    const processedDates = new Set();

    // Filter for matching dates between firstJson and secondJson
    const commonDates = firstJson.filter(first =>
      secondJson.some(second => first.Date === second.Date)
    );

    return commonDates.map((commonDate, index) => {
      // If this date has already been processed, skip it
      if (processedDates.has(commonDate.Date)) {
        return null; // Skip rendering this date
      }

      // Mark this date as processed
      processedDates.add(commonDate.Date);

      // Filter data for the first and second JSON based on the common date
      const firstTableData = firstJson.filter(item => item.Date === commonDate.Date);
      const secondTableData = secondJson.filter(item => item.Date === commonDate.Date);

      return (
        <div key={index} className="mb-8">
          {/* Card for Matching Date Transactions */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Transactions for {commonDate.Date}</h3>
            <div className="grid grid-cols-2 gap-8">
              {/* Table for First JSON (Jenny N) */}
              <div className="p-4 border rounded-lg shadow-sm">
                <h4 className="font-medium mb-4">Jenny N Transactions</h4>
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left">Date</th>
                      <th className="py-2 px-4 text-left">Detail</th>
                      <th className="py-2 px-4 text-left">Transaction</th>
                      <th className="py-2 px-4 text-left">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {firstTableData.map((data, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{data.Date}</td>
                        <td className="py-2 px-4">{data.Detail}</td>
                        <td className="py-2 px-4">{data.transaction}</td>
                        <td className="py-2 px-4">{data.balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table for Second JSON (Yontaro) */}
              <div className="p-4 border rounded-lg shadow-sm">
                <h4 className="font-medium mb-4">Yontaro Transactions</h4>
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left">Date</th>
                      <th className="py-2 px-4 text-left">Detail</th>
                      <th className="py-2 px-4 text-left">Transaction</th>
                      <th className="py-2 px-4 text-left">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {secondTableData.map((data, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{data.Date}</td>
                        <td className="py-2 px-4">{data.Detail}</td>
                        <td className="py-2 px-4">{data.transaction}</td>
                        <td className="py-2 px-4">{data.balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <SidebarLayout>
      {/* Main Content */}
      <div className="flex-1">
        <HeaderProfile />
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 px-4 py-2 text-sm">
          <span>Analysis</span>
          <ChevronRight size={16} />
          <span>Window Dressing</span>
        </div>

        {/* Profile Information */}
        <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-200 mb-4">
          <div className="grid grid-cols-2 gap-8">
            {/* Left column (Profile from JSON 1) */}
            <div className="flex items-start space-x-4">
              <img
                src={require('../../Assets/Image/bca.png')}
                alt="BCA Logo"
                className="w-20 h-20 object-contain"
              />
              <div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-600">Name (Jenny N)</label>
                  <p className="text-sm font-medium">{firstJson[0]?.name || 'N/A'}</p>
                </div>
                <div className="mt-4 space-y-1">
                  <label className="text-sm text-gray-600">Account Number</label>
                  <p className="text-sm font-medium">{firstJson[0]?.accountNum || 'N/A'}</p>
                </div>
                <div className="mt-4 space-y-1">
                  <label className="text-sm text-gray-600">Address</label>
                  <p className="text-sm font-medium">{firstJson[0]?.['address '] || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Right column (Profile from JSON 2) */}
            <div className="flex items-start space-x-4">
              <img
                src={require('../../Assets/Image/bca.png')}
                alt="BCA Logo"
                className="w-20 h-20 object-contain"
              />
              <div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-600">Name (Yontaro)</label>
                  <p className="text-sm font-medium">{secondJson[0]?.name || 'N/A'}</p>
                </div>
                <div className="mt-4 space-y-1">
                  <label className="text-sm text-gray-600">Account Number</label>
                  <p className="text-sm font-medium">{secondJson[0]?.accountNum || 'N/A'}</p>
                </div>
                <div className="mt-4 space-y-1">
                  <label className="text-sm text-gray-600">Address</label>
                  <p className="text-sm font-medium">{secondJson[0]?.['address '] || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Render matching transactions */}
        {renderMatchingTransactions()}
      </div>
    </SidebarLayout>
  );
};

export default WindowHome;
