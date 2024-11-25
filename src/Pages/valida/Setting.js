import React from 'react';
import {
  Users, CreditCard, Terminal, FileText,
  Layout, Monitor, Link, Lock, Trash2,
  Home, Upload, PieChart, Download, Settings,
  HelpCircle, ChevronRight, Bell
} from 'lucide-react';
import SidebarLayout from '../Component/Sidebar/Layout';
import HeaderProfile from '../Component/Card/HeaderProfile';

const SettingsPage = () => {
  return (
    <SidebarLayout>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <HeaderProfile/>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Dashboard</span>
            <ChevronRight size={16} />
            <span className="text-gray-900">Settings</span>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-4 gap-6">
          <SettingCard
            icon={<Users size={24} />}
            title="Member & Access"
            description="Manage team members and their access levels"
          />
          <SettingCard
            icon={<CreditCard size={24} />}
            title="Usage & Billing"
            description="Review usage metrics and billing information"
          />
          <SettingCard
            icon={<Terminal size={24} />}
            title="API Settings"
            description="Configure API keys and endpoints"
          />
          <SettingCard
            icon={<FileText size={24} />}
            title="Custom Category"
            description="Create and manage custom categories"
          />
          <SettingCard
            icon={<Layout size={24} />}
            title="Categorization Module"
            description="Configure categorization rules"
          />
          <SettingCard
            icon={<Monitor size={24} />}
            title="Custom Template"
            description="Create and manage document templates"
          />
          <SettingCard
            icon={<Link size={24} />}
            title="Integration"
            description="Set up third-party integrations"
          />
          <SettingCard
            icon={<Lock size={24} />}
            title="Change Password"
            description="Update your account password"
          />
          <SettingCard
            icon={<Trash2 size={24} />}
            title="Delete Organization"
            description="Permanently remove organization data"
            danger
          />
        </div>
      </div>
      </SidebarLayout>
  );
};

const SidebarItem = ({ icon, text, active }) => (
  <div className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
    {icon}
    <span>{text}</span>
  </div>
);

const SettingCard = ({ icon, title, description, danger }) => (
  <div className={`bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow ${danger ? 'hover:border-red-500 border border-transparent' : ''}`}>
    <div className={`mb-4 ${danger ? 'text-red-500' : 'text-blue-600'}`}>
      {icon}
    </div>
    <h3 className={`text-lg font-semibold mb-2 ${danger ? 'text-red-500' : ''}`}>{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default SettingsPage;
