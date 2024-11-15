import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell, Home, Upload, FileText, Layout, PieChart, Settings, BarChart, Database, Shield, LifeBuoy
} from 'lucide-react';

const SidebarLayout = ({ children }) => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // State to control the sidebar width
  
  const iconMap = {
    "Dashboard": <Home size={20} />,
    "Document Processing": <Upload size={20} />,
    "Upload Documents": <FileText size={20} />,
    "Processed Files": <FileText size={20} />,
    "Template Hub": <Layout size={20} />,
    "Analysis": <PieChart size={20} />,
    "Credit Analysis": <BarChart size={20} />,
    "Bank Statement": <Database size={20} />,
    "Financial Reports": <FileText size={20} />,
    "Security": <Shield size={20} />,
    "Help Center": <LifeBuoy size={20} />,
    "Settings": <Settings size={20} />,
  };

  const menuItems = [
    { to: "/", label: "Dashboard" },
    { to: "/scanned-files", label: "Document Processing" },
    { to: "/upload", label: "Upload Documents" },
    { to: "/upload/:document/processed-file", label: "Processed Files" },
    { to: "/template-hub", label: "Template Hub" },
    { to: "/analyzed-files", label: "Analysis" },
    { to: "/credit-analysis", label: "Credit Analysis" },
    { to: "/bank-statement", label: "Bank Statement" },
    { to: "/financial-report", label: "Financial Reports" },
    { to: "/security", label: "Security" },
    { to: "/help-Center", label: "Help Center" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out bg-white shadow-sm max-h-screen overflow-y-auto ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}
      >
        {/* Sidebar content */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className={`text-xl font-bold text-[#1E3A8A] ${isSidebarCollapsed ? 'hidden' : ''}`}>Valida</span>
          </div>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${location.pathname === item.to ? 'bg-[#EFF6FF] text-[#1E3A8A]' : 'text-[#6B7280] hover:bg-[#F3F4F6]'}`}
            >
              {/* Render the icon based on the label */}
              {iconMap[item.label]}
              {/* Show label only when sidebar is expanded */}
              <span className={`${isSidebarCollapsed ? 'hidden' : ''}`}>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Sidebar Toggle Button */}
        <div className="absolute bottom-4 left-4">
          <button
            className="flex items-center justify-center w-10 h-10 bg-[#1E3A8A] text-white rounded-full"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? '>' : '<'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-[#F3F4F6] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
