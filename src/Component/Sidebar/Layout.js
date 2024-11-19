import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell, Home, Upload, FileText, Layout, PieChart, Settings, BarChart, Database, Shield, LifeBuoy,
  ChevronLeft, ChevronRight  // Import the necessary icons for toggling
} from 'lucide-react';

const SidebarLayout = ({ children }) => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
    { to: "/", label: "Dashboard", disabled: false },
    { to: "/scanned-files", label: "Document Processing", disabled: false },
    { to: "/upload", label: "Upload Documents", disabled: false },
    { to: "/upload/:document/processed-file", label: "Processed Files", disabled: true },
    { to: "/template-hub", label: "Template Hub", disabled: true },
    { to: "/analyzed-files", label: "Analysis", disabled: false },
    { to: "/credit-analysis", label: "Credit Analysis", disabled: true },
    { to: "/bank-statement", label: "Bank Statement", disabled: true },
    { to: "/financial-report", label: "Financial Reports", disabled: true },
    { to: "/security", label: "Security", disabled: true },
    { to: "/help-Center", label: "Help Center", disabled: true },
    { to: "/settings", label: "Settings", disabled: false },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-sm overflow-y-auto transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className={`text-xl font-bold text-[#1E3A8A] ${isSidebarCollapsed ? 'hidden' : ''}`}>
              Valida
            </span>
          </div>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => (
            item.disabled ? (
              // Disabled item, render as div with cursor-not-allowed
              <div
                key={item.label}
                className={`flex items-center space-x-2 px-4 py-2 cursor-not-allowed text-[#1E3A8A] hover:bg-[#F3F4F6]`} // Keep default color
              >
                {iconMap[item.label]}
                <span className={`${isSidebarCollapsed ? 'hidden' : ''}`}>{item.label}</span>
              </div>
            ) : (
              // Active (clickable) link
              <Link
                key={item.label}
                to={item.to}
                className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${
                  location.pathname === item.to
                    ? 'bg-[#EFF6FF] text-[#1E3A8A]'
                    : 'text-[#1E3A8A] hover:bg-[#F3F4F6] hover:text-[#1E3A8A]'
                }`}
              >
                {iconMap[item.label]}
                <span className={`${isSidebarCollapsed ? 'hidden' : ''}`}>{item.label}</span>
              </Link>
            )
          ))}
        </nav>

        <div className="absolute bottom-4 left-4">
          <button
            className="flex items-center justify-center w-10 h-10 bg-[#1E3A8A] text-white rounded-full"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 min-h-screen bg-[#F3F4F6] p-8 overflow-y-auto transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
