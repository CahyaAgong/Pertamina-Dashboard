import React, { useState } from 'react';
import {
  Home, Upload, FileText, Layout, PieChart,
  HelpCircle, Download, Settings, Bell,
  Trash2, Filter, Edit, BarChart2,
  Info, ChevronRight, FileUp
} from 'lucide-react';
import SidebarLayout from '../Component/Sidebar/Layout';
import AnalyticsDashboardBalance from '../Component/Dashboard/Balance';
import TransactionDashboard from '../Component/Dashboard/Transaction';
import MerchantDashboard from '../Component/Dashboard/Merchant';
import DynamicTableWithPagination from '../Component/DynamicForm/DynamicTable';
import DynamicLineChart from '../Component/DynamicForm/DynamicLineChart';
import DynamicBarChart from '../Component/DynamicForm/DynamicBarChart';
import AnalyticsTransaction from '../Component/Dashboard/TabTransaction';
import profileData from '../Component/Profile.json'

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState("Transaction"); // Track active tab

  // Data for the charts
  const pieData = {
    labels: ['BANK A', 'BANK B', 'BANK C'],
    datasets: [
      {
        data: [50, 25, 25],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const barData = {
    labels: ['May', 'June', 'July', 'August', 'September', 'October'],
    datasets: [
      {
        label: 'Cash Flow',
        data: [1200, 800, 1500, 400, 1000, 200],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'Revenue',
        data: [200, 400, 300],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Change active tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <SidebarLayout>
      {/* Main Content */}
      <div className="flex-1">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 px-4 py-2 text-sm">
          <span>Dashboard</span>
          <ChevronRight size={16} />
          <span>Detail Profile</span>
        </div>

        {/* Action Buttons */}
        <div className="px-4 py-2 flex justify-end space-x-2">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg">
            <FileUp size={18} className="mr-2" /> Export to PDF/XLS
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg">
            <Download size={18} className="mr-2" /> Export Raw Data
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg">
            <Edit size={18} className="mr-2" /> Edit Data
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg">
            <BarChart2 size={18} className="mr-2" /> Set Metrics
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg">
            <Filter size={18} className="mr-2" /> Filter
          </button>
        </div>

        {/* Profile Information */}
        <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="grid grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <img
                src={require('../Assets/Image/bca.png')}
                alt="BRI Logo"
                className="w-20 h-20 object-contain"
              />
              <div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-600">Name</label>
                  <p className="font-medium">{profileData.name}</p>
                </div>
                <div className="mt-4 space-y-1">
                  <label className="text-sm text-gray-600">Account Number</label>
                  <p className="font-medium">{profileData.account_number}</p>
                </div>
                <div className="mt-4 space-y-1">
                  <label className="text-sm text-gray-600">Period</label>
                  <p className="font-medium">{profileData.period}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Branch</label>
                <p className="font-medium">{profileData.branch}</p>
              </div>
              <div className="mt-4 space-y-1">
                <label className="text-sm text-gray-600">Created by</label>
                <p className="font-medium">{profileData.created_by}</p>
              </div>
              <div className="mt-4 space-y-1">
                <label className="text-sm text-gray-600">Bank</label>
                <p className="font-medium">{profileData.bank}</p>
              </div>
            </div>
            <div>
              <div className="space-y-1">
                <label className="text-sm text-gray-600">File Uploaded</label>
                <p className="font-medium">{profileData.file_uploaded}</p>
              </div>
              <div className="mt-4 space-y-1">
                <label className="text-sm text-gray-600">Address</label>
                <p className="font-medium">{profileData.address}</p>
              </div>
              <div className="mt-4 space-y-1">
                <label className="text-sm text-gray-600">Currency</label>
                <p className="font-medium">{profileData.currency}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 border-b">
          <div className="flex space-x-8">
            <TabItem text="Transaction" active={activeTab === 'Transaction'} onClick={() => handleTabChange('Transaction')} />
            <TabItem text="Balance Overview" active={activeTab === 'Balance Overview'} onClick={() => handleTabChange('Balance Overview')} />
            <TabItem text="Transaction Behavior" active={activeTab === 'Transaction Behavior'} onClick={() => handleTabChange('Transaction Behavior')} />
            <TabItem text="Merchant Analysis" active={activeTab === 'Merchant Analysis'} onClick={() => handleTabChange('Merchant Analysis')} />
          </div>
        </div>

        {/* Conditional Rendering of Content based on Active Tab */}
        <div className="p-4 space-y-6">
          {activeTab === "Balance Overview" && <AnalyticsDashboardBalance />}
          {activeTab === "Transaction" && (
            <>
              <AnalyticsTransaction />
              <div className="flex space-x-4">
                <div className="flex-1">
                  <DynamicLineChart />
                </div>
                <div className="flex-1">
                  <DynamicBarChart />
                </div>
              </div>
            </>
          )}
          {activeTab === "Transaction Behavior" && <TransactionDashboard />}
          {activeTab === "Merchant Analysis" && <MerchantDashboard />}
        </div>
      </div>
    </SidebarLayout>
  );
};

// TabItem Component
const TabItem = ({ text, active, onClick }) => (
  <button
    className={`px-4 py-2 text-sm font-medium ${active ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
    onClick={onClick}
  >
    {text}
  </button>
);

export default AnalyticsDashboard;