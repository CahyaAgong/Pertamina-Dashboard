import React from 'react';
import { Bell } from 'lucide-react'; // Import the icons you need
import SidebarLayout from './Component/Sidebar/Layout';
import SolutionCard from './Component/Card/SolutionCard';

const Dashboard = () => {
  return (
    <SidebarLayout>
      {/* Main Content inside Layout */}
      <div className="flex-1 p-8 bg-[#F9FAFB] rounded-lg"> {/* Soft background color */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1E3A8A]">Valida <span className="text-[#34D399]">Truth in Every Document</span></h1>
          <div className="flex items-center space-x-4 text-black">
            <span>WV</span>
            {/* Profile Icon with Tooltip */}
            <div className="relative group">
              <img
                src={require('./Assets/Image/profile.png')} // Use a URL for the profile picture here
                alt="Profile"
                className="w-8 h-8 rounded-full cursor-pointer"
              />
              <div className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded-lg p-2 right-0 top-full w-36">
                <div className="flex flex-col space-y-2">
                  <button className="text-sm">Profile</button>
                  <button className="text-sm text-red-500">Sign Out</button>
                </div>
              </div>
            </div>

            {/* Notification Bell */}
            <Bell size={20} />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-[#333333]">Select which Valida solutions fit best for you</h2>

        {/* Centering the Solution Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8 justify-items-center">
          {/* Solution Cards */}
          <SolutionCard
            icon="🔄"
            title="Extract data from documents"
            description="Digitize data from e-statements, invoices, and receipts instantly. Say goodbye to manual data input!"
            buttonText="Try it Now"
            link="/scanned-files"
            className="bg-white rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105" // Hover effect with scaling
          />
          <SolutionCard
            icon="📊"
            title="Bank statements"
            description="Supercharge your underwriting 10x faster with bank statement analyzer and in-depth analysis of transaction data"
            buttonText="Start Analyzing"
            link="/analyzed-files"
            className="bg-white rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105"
          />
          {/* New Solution Card */}
          <SolutionCard
            icon="📈"
            title="Automated Document Review"
            description="Automatically analyze and review documents for errors, inconsistencies, and key information."
            buttonText="Start Reviewing"
            link="/scanned-files"
            className="bg-white rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105"
          />
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-[#333333]">Total Documents Processed</h3>
            <p className="text-2xl font-bold text-[#1E3A8A]">1,245</p>
            <p className="text-sm text-gray-500">Documents processed in the last 30 days</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-[#333333]">Data Extraction Accuracy</h3>
            <p className="text-2xl font-bold text-[#34D399]">98%</p>
            <p className="text-sm text-gray-500">Accuracy rate of data extraction from documents</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-[#333333]">Bank Statements Analyzed</h3>
            <p className="text-2xl font-bold text-[#1E3A8A]">345</p>
            <p className="text-sm text-gray-500">Bank statements analyzed in the last 7 days</p>
          </div>
        </div>

        {/* Graph or Progress Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-lg font-semibold text-[#333333] mb-4">System Performance</h3>
          <div className="flex items-center justify-between">
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-[#34D399] rounded-full" style={{ width: '75%' }}></div>
            </div>
            <span className="ml-2 text-sm text-gray-600">75% Capacity</span>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Dashboard;
