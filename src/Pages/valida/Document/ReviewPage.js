import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SidebarLayout from '../../../Component/Sidebar/Layout';
import { ChevronLeft, Bell } from 'lucide-react';
import HeaderProfile from '../../../Component/Card/HeaderProfile';

const DocumentReviewPage = () => {
  const location = useLocation();  // Access the location object to get the file from state
  const file = location.state?.file;  // Retrieve the file from the state, if available
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);  // State to manage zoom level
  const [jsonData, setJsonData] = useState([ // Setting the JSON data into state so it can be updated
    { "Date": "01/05", "KETERANGAN": "SALDO AWAL", "SALDO": "-564,845,718.45" },
    { "Date": "02/05", "KETERANGAN": "TRSF E-BANKING DB 0205/FTSCY/WS90671 135154282.00 PEMBAYARAN PAJAK", "SALDO": "-700,000,000.45" },
    { "Date": "03/05", "KETERANGAN": "TRSF E-BANKING DB 0205/FTSCY/WS90671  300000000.00 DENDA", "SALDO": "-1,000,000,000.45" },
    { "Date": "06/05", "KETERANGAN": "TRSF E-BANKING DB 0205/FTSCY/WS90671  100000000.00 bkl HENRY S H", "SALDO": "-900,000,000.45" },
    { "Date": "13/05", "KETERANGAN": "TRSF E-BANKING DB 0205/FTSCY/WS90671  TANGGAL :12/05 50000000.00 HENRY S H", "SALDO": "-950,000,000.45" },
    { "Date": "21/05", "KETERANGAN": "TRSF E-BANKING DB 0205/FTSCY/WS90671   300000000.00 rk ka HENRY S H", "SALDO": "0" },
    { "Date": "21/05", "KETERANGAN": "TRSF E-BANKING DB 0205/FTSCY/WS90671   30000000.00 wnsr Tono S", "SALDO": "-680,000,000.45" },
    { "Date": "22/05", "KETERANGAN": "TRSF E-BANKING DB 0205/FTSCY/WS90671 250000000.00 Adidas", "SALDO": "-430,000,000.45" },
    { "Date": "24/05", "KETERANGAN": "TRSF E-BANKING DB 0205/FTSCY/WS90671   30000000.00 rk gn HENRY S H", "SALDO": "-460,000,000.45" },
    { "Date": "27/05", "KETERANGAN": "PEMBAYARAN PINJ. 2588390000 BUNGA KREDIT LOKAL", "SALDO": "-468,011,422.19" },
    { "Date": "31/05", "KETERANGAN": "BIAYA ADM ", "SALDO": "-468,041,422.19" }
  ]);

  // Create preview URL if it's an image
  useEffect(() => {
    if (file && file.type.startsWith('image')) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    }
  }, [file]);

  // Zoom In handler
  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 3)); // Limit max zoom to 3x
  };

  // Zoom Out handler
  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 1)); // Limit min zoom to 1x
  };

  // Handler to update balance
  const handleBalanceChange = (index, newBalance) => {
    const updatedData = [...jsonData];
    updatedData[index].SALDO = newBalance;
    setJsonData(updatedData);
  };

  return (
    <SidebarLayout>
      <div className="flex-1 flex flex-col">
        {/* Progress Steps */}
        <HeaderProfile />

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
            <ProgressStep number="3" text="Relabel Results" active />
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
            </div>
            <div className="bg-white h-[400px] rounded-b-lg flex items-center justify-center">
              {imagePreviewUrl ? (
                <img
                  src={imagePreviewUrl}
                  className="w-auto h-full object-contain"
                  alt="Document preview"
                  style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.3s ease' }}
                />
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
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Date</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Detail</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {jsonData.map((row, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{row.Date}</td>
                      <td className="px-4 py-2">{row.KETERANGAN}</td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={row.SALDO ?? 'N/A'}
                          onChange={(e) => handleBalanceChange(index, e.target.value)}
                          className="w-full p-1 text-right"
                        />
                      </td>
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
            {/* Zoom In/Out Buttons */}
            <button
              onClick={handleZoomIn}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Zoom In
            </button>
            <button
              onClick={handleZoomOut}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Zoom Out
            </button>
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
