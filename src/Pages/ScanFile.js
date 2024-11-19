import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import SidebarLayout from '../Component/Sidebar/Layout';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import HeaderProfile from '../Component/Card/HeaderProfile';

const ScannedFilesPage = () => {
  // Dummy file data
  const allFiles = [
    { id: 1, filename: 'C:\\Users\\David P\\Documents\\Laiye\\Proc...', assignTo: 'John Doe', uploadedAt: '10/16/2024', exportStatus: 'Not Exported', nomorSurat: 'CTP / SO / 000034440', companyName: 'JAYA ABADI MAKMUR SE...' },
    { id: 2, filename: 'D:\\Laiye\\Processing Folder\\AP Processi...', assignTo: 'Jane Smith', uploadedAt: '08/07/2024', exportStatus: 'Exported', nomorSurat: '-', companyName: 'PT . SHS International' },
    { id: 3, filename: 'D:\\Laiye\\Processing Folder\\AP Processi...', assignTo: 'David P', uploadedAt: '09/01/2024', exportStatus: 'Not Exported', nomorSurat: '-', companyName: 'XYZ Global' },
    { id: 4, filename: 'D:\\Laiye\\Processing Folder\\AP Processi...', assignTo: 'John Doe', uploadedAt: '10/05/2024', exportStatus: 'Exported', nomorSurat: 'CTP / SO / 000034441', companyName: 'PT . SHS International' },
    { id: 5, filename: 'D:\\Laiye\\Processing Folder\\AP Processi...', assignTo: 'Jane Smith', uploadedAt: '08/15/2024', exportStatus: 'Not Exported', nomorSurat: 'CTP / SO / 000034442', companyName: 'JAYA ABADI MAKMUR SE...' }
  ];

  const [activeTab, setActiveTab] = useState('All Files'); // Track active tab

  // Handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Determine which files to display based on the active tab
  const getDisplayedFiles = () => {
    switch (activeTab) {
      case 'Approved':
        return allFiles.filter(file => file.exportStatus === 'Exported');
      case 'In Review':
        return allFiles.filter(file => file.exportStatus === 'Not Exported');
      default:
        return allFiles;
    }
  };

  // Function to generate and download PDF
  const downloadPDF = () => {
    const filesToDownload = getDisplayedFiles();
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text("Extracted Data", 20, 20);

    // Add headers
    doc.setFontSize(12);
    const headers = ['File name', 'Assigned to', 'Uploaded at', 'Export Status', 'Nomor_Surat_Jalan', 'Company_Name'];
    doc.text(headers.join(' | '), 20, 30);

    // Add file data to PDF
    let yOffset = 40;
    filesToDownload.forEach(file => {
      const row = [
        file.filename,
        file.assignTo,
        file.uploadedAt,
        file.exportStatus,
        file.nomorSurat,
        file.companyName
      ];
      doc.text(row.join(' | '), 20, yOffset);
      yOffset += 10; // Space between rows
    });

    // Save PDF
    doc.save('extracted_files_data.pdf');
  };

  return (
    <SidebarLayout>
      {/* Main Content */}
      <div className="flex-1 p-8">
        <HeaderProfile/>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <span>Workflow</span>
            <span>/</span>
            <span className="font-medium text-gray-900">Extract Data</span>
          </div>
        </div>

        {/* Tabs and Search */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-6">
            <TabItem text="All Files" count="5" active={activeTab === 'All Files'} onClick={() => handleTabChange('All Files')} />
            <TabItem text="Approved" count="2" active={activeTab === 'Approved'} onClick={() => handleTabChange('Approved')} />
            <TabItem text="In Review" count="3" active={activeTab === 'In Review'} onClick={() => handleTabChange('In Review')} />
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white">
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Files Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="w-8 p-4">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">File name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Review status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Assigned to</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Uploaded at</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Export Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Nomor_Surat_Jalan</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Company_Name</th>
                <th className="w-8"></th>
              </tr>
            </thead>
            <tbody>
              {getDisplayedFiles().map((file) => (
                <tr key={file.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-4 py-3 text-sm">{file.filename}</td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 text-sm hover:underline">{file.exportStatus}</button>
                  </td>
                  <td className="px-4 py-3 text-sm">{file.assignTo}</td>
                  <td className="px-4 py-3 text-sm">{file.uploadedAt}</td>
                  <td className="px-4 py-3 text-sm">{file.exportStatus}</td>
                  <td className="px-4 py-3 text-sm">{file.nomorSurat}</td>
                  <td className="px-4 py-3 text-sm">{file.companyName}</td>
                  <td className="px-4 py-3">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ChevronLeft size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center px-4 py-3">
            <div className="flex items-center space-x-4">
              <Link to='/upload'>
                <button className="px-4 py-2 text-white bg-blue-600 rounded-lg">
                  Upload Files
                </button>
              </Link>
              <button
                onClick={downloadPDF}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg"
              >
                Download Extracted Data (PDF)
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button className="p-1 rounded hover:bg-gray-100">
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm">Page 1 of 1</span>
                <button className="p-1 rounded hover:bg-gray-100">
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Rows per page:</span>
                <select className="border rounded p-1 text-sm">
                  <option>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

const TabItem = ({ text, count, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 pb-2 border-b-2 ${active ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}
  >
    <span>{text}</span>
    <span className="text-sm">({count})</span>
  </button>
);

export default ScannedFilesPage;
