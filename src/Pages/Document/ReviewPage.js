import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SidebarLayout from '../../Component/Sidebar/Layout';
import { ChevronLeft, Bell } from 'lucide-react';
import HeaderProfile from '../../Component/Card/HeaderProfile';

const DocumentReviewPage = () => {
  const location = useLocation();  // Access the location object to get the file from state
  const file = location.state?.file;  // Retrieve the file from the state, if available
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4; // Update based on the file's total pages if needed

  const extractedData = [
    { id: 1, balance: "1,385,000.65", page_no: 1, tx_date: "01/07/2023", tx_notes: "BFST034001099204508N", tx_types: "Credit", balance_number: "1385000.65" },
    { id: 2, balance: "1,382,500.65", page_no: 1, tx_date: "01/07/2023", tx_notes: "BFST869164043N4NMB.C1", tx_types: "Debit", balance_number: "1382500.65" },
    { id: 3, balance: "1,282,500.65", page_no: 1, tx_date: "01/07/2023", tx_notes: "BFST869164043N4NMB.C1", tx_types: "Debit", balance_number: "1282500.65" },
  ];

  // Create preview URL if it's an image
  useEffect(() => {
    if (file && file.type.startsWith('image')) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    }
  }, [file]);

  return (
    <SidebarLayout>
      <div className="flex-1 flex flex-col">
        {/* Progress Steps */}
      <HeaderProfile/>

        <div className="p-4">
          <div className="flex items-center space-x-2">
            <ChevronLeft className="text-gray-500" size={20} />
            <span className="text-gray-500">Upload</span>
          </div>
        </div>
        <div className="px-8 py-4 bg-white border-b">
          <div className="flex items-center max-w-3xl mx-auto">
            <ProgressStep number="1" text="Upload Your File" completed />
            <ProgressStep number="2" text="Processing Files" completed />
            <ProgressStep number="3" text="Relabel Results" active/>
          </div>
        </div>

        <div className="flex flex-1">
          {/* Image Preview Section */}
          <div className="w-1/3 border-r bg-gray-100 p-4">
            <div className="bg-gray-800 text-white p-2 rounded-t-lg flex items-center justify-between">
              <input
                type="text"
                value={file?.name}
                className="bg-gray-700 text-sm px-2 py-1 rounded flex-1 mr-2"
                readOnly
              />
              {/* Add zoom and rotation buttons */}
            </div>
            <div className="bg-white h-[400px] rounded-b-lg flex items-center justify-center">
              {imagePreviewUrl ? (
                <img src={imagePreviewUrl} className="w-auto h-full object-contain" alt="Document preview" />
              ) : (
                <div className="flex items-center justify-center text-gray-500">Loading Image...</div>
              )}
            </div>
          </div>

          {/* Table Section */}
          <div className="w-2/3 bg-white p-4">
            <div className="text-sm text-blue-600 mb-4">Batch #1</div>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">ID</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Balance</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Page No</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Transaction Date</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Transaction Notes</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Transaction Types</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Balance Number</th>
                  </tr>
                </thead>
                <tbody>
                  {extractedData.map((row) => (
                    <tr key={row.id} className="border-t">
                      <td className="px-4 py-2">{row.id}</td>
                      <td className="px-4 py-2">{row.balance}</td>
                      <td className="px-4 py-2">{row.page_no}</td>
                      <td className="px-4 py-2 flex items-center">
                        {row.tx_date}
                      </td>
                      <td className="px-4 py-2">{row.tx_notes}</td>
                      <td className="px-4 py-2">{row.tx_types}</td>
                      <td className="px-4 py-2">{row.balance_number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t bg-white p-4 flex justify-between items-center">
          <div className="flex space-x-2">

          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
              Save
            </button>
            <Link to='/analyzed-files'>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save & Go to Analysis
              </button>
            </Link>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

const ProgressStep = ({ number, text, active, completed }) => (
  <div className="flex items-center flex-1">
    <div className={`flex items-center justify-center w-6 h-6 rounded-full 
      ${completed ? 'bg-green-600 text-white' : active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
      text-sm`}>
      {number}
    </div>
    <div className={`ml-2 text-sm ${active ? 'text-gray-900' : 'text-gray-500'}`}>{text}</div>
    {number !== "3" && <div className="flex-1 mx-4 h-px bg-gray-200" />}
  </div>
);

export default DocumentReviewPage;
