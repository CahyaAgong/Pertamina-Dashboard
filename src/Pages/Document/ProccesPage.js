import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import SidebarLayout from '../../Component/Sidebar/Layout';
import { ChevronLeft, Bell } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';  // Import pdfjs from react-pdf
import HeaderProfile from '../../Component/Card/HeaderProfile';

// Set worker source for pdf.js (before rendering)
pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js';

const DocumentProcessingPage = () => {
  const { document } = useParams();  // Get the document param from the URL
  const location = useLocation();  // Access the location object
  const navigate = useNavigate();  // Use navigate to go to the next page
  const file = location.state?.file;  // Retrieve the file from the state, if available

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);  // Track total pages for PDF
  const [fileUrl, setFileUrl] = useState(null);

  // Handle file preview logic
  const renderFilePreview = (isMainPreview = false) => {
    if (!file || !file[0]) return null; // No file or file array is empty
  
    const fileObj = file[0];  // We assume single file for simplicity
    const filePreviewUrl = URL.createObjectURL(fileObj); // Create a preview URL for the file
  
    // Adjust the style based on whether it's the main preview or the secondary preview
    const commonStyle = isMainPreview
      ? 'w-full h-auto mt-4 object-contain'  // Full width, maintain aspect ratio
      : 'w-full h-auto mt-4 object-contain';  // Full width, maintain aspect ratio
  
    if (fileObj.type.startsWith('image')) {
      // If it's an image, render an image preview with size adjusted
      return <img src={filePreviewUrl} alt={fileObj.name} className={commonStyle} />;
    } else if (fileObj.type === 'application/pdf') {
      // If it's a PDF, render it using react-pdf with the size adjusted
      return (
        <div className="flex justify-center mt-4">
          <Document
            file={filePreviewUrl}
            onLoadSuccess={({ numPages }) => setTotalPages(numPages)}
          >
            <Page pageNumber={currentPage} />
          </Document>
        </div>
      );
    } else {
      // Handle other file types (for now, show the file name)
      return <div className="text-center">{fileObj.name}</div>;
    }
  };
  
  

  // Initialize the file URL only once when the file is available
  useEffect(() => {
    if (file && file[0]) {
      const fileObj = file[0];
      const filePreviewUrl = URL.createObjectURL(fileObj); // Create a preview URL for the file
      setFileUrl(filePreviewUrl);  // Set the URL for file preview (image or PDF)
    }
  }, [file]); // Only re-run when the file changes

  // Handle file upload and navigate to DocumentReviewPage
  const handleUpload = () => {
    if (file && file[0]) {
      navigate(`/upload/${document}/processed-file/review-file`, {
        state: { file: file[0] }  // Pass the file to the next page
      });
    }
  };

  return (
    <SidebarLayout>
      <div className="flex-1">
        <HeaderProfile/>
        <div className="p-4  flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <ChevronLeft size={20} />
              <span>Upload</span>
            </button>
          </div>
        </div>

        <div className="px-8 py-4 bg-white border-b">
          <div className="flex items-center max-w-3xl mx-auto">
            <ProgressStep number="1" text="Upload Your File" completed />
            <ProgressStep number="2" text="Processing Files" active />
            <ProgressStep number="3" text="Relabel Results" />
          </div>
        </div>
        {/* change this into Proccessing data */}
        <div className="flex h-[calc(100vh-140px)]">
          <div className="w-72 border-r bg-white p-4">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Choose Service Type</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Scan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Split Document</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Split Document ON</option>
                </select>
              </div>
            </div>
          </div>

          {/* Document Preview */}
          <div className="flex-1 p-4 flex flex-col">
            <div className="flex-1 bg-white rounded-lg border overflow-hidden flex">
              <div className="w-20 border-r flex flex-col">
                <div className="p-2 border-b bg-gray-50">
                  <span className="text-sm font-medium text-gray-600">Pages ({totalPages})</span>
                  {renderFilePreview(true)} {/* First preview, smaller size */}
                </div>
                {/* Page navigation logic can be added here */}
              </div>

              <div className="flex-1 flex flex-col">
                <div className="h-12 border-b flex justify-between items-center px-4 bg-gray-50">
                  <span className="py-1.5">Page {currentPage} of {totalPages}</span>
                </div>
                <div className="flex-1 bg-gray-100 p-4 overflow-auto">
                  {/* Second preview, full width and larger */}
                  {renderFilePreview()} 
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Process */}

        {/* Full-Width Card with Button on the Far Right */}
        <div className="mt-0">
          <div className="w-full bg-white border border-gray-300 shadow-lg p-6 flex justify-end">
            <button
              onClick={handleUpload}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Upload & Go to Review Page
            </button>
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

export default DocumentProcessingPage;
