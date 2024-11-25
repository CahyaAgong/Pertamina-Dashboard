import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import SidebarLayout from '../../Component/Sidebar/Layout';
import { ChevronLeft, Bell } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
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
  const [loading, setLoading] = useState(true);  // Track loading state

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
      
      // Simulate loading process and then redirect after 5 seconds
      setTimeout(() => {
        setLoading(false);  // Change loading state after 5 seconds
        navigate(`/upload/${document}/processed-file/review-file`, {  // Navigate to the review page
          state: { file: file[0] }  // Pass the file to the next page
        });
      }, 5000);  // Wait for 5 seconds before navigating
    }
  }, [file, document, navigate]); // Only run this effect when the file or document changes

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
        <HeaderProfile />
        <div className="p-4 flex justify-between items-center">
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

        {/* Document Processing Card with Loading */}
        <div className="max-w-10xl mx-auto mt-8">
          <div className="bg-white border shadow-lg p-6 rounded-lg">
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full border-t-4 border-blue-600 w-12 h-12 mr-4"></div>
                <span className="text-lg font-semibold text-gray-600">Document Processing...</span>
              </div>
            ) : (
              <div>
                {renderFilePreview(true)} {/* Main Preview Area */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleUpload}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Upload & Go to Review Page
                  </button>
                </div>
              </div>
            )}
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
