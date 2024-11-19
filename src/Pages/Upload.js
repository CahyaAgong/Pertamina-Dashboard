import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // Import useNavigate for navigation
import { CloudUpload, ChevronLeft, Bell } from 'lucide-react';
import SidebarLayout from '../Component/Sidebar/Layout';
import HeaderProfile from '../Component/Card/HeaderProfile';

const UploadPage = () => {
  const { document } = useParams(); // Retrieve the dynamic document parameter
  const navigate = useNavigate(); // Hook to navigate between pages
  const [file, setFile] = useState(null);
  const [uploadType, setUploadType] = useState("single-bank-upload"); // Default to single upload
  const [progressStep, setProgressStep] = useState(1); // Track progress step
  const [isUploading, setIsUploading] = useState(false); // Track uploading state
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress (0 to 100)

  // Create a ref for the file input
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (uploadType === "single-bank-upload" && selectedFiles.length > 1) {
      alert("You can only upload one file for this option.");
      return;
    }
    setFile(selectedFiles);
    setProgressStep(2); // Move to next progress step after file selection
    setIsUploading(true); // Set uploading state to true

    // Simulate file upload process with a delay
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress); // Update upload progress
      if (progress === 100) {
        clearInterval(uploadInterval); // Stop the interval once progress reaches 100
        setIsUploading(false); // Stop uploading state
        setProgressStep(3); // Move to next progress step
      }
    }, 300); // Simulate progress increment every 300ms
  };

  // Trigger the file input click when "Browse" is clicked
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click via ref
    }
  };

  // Handle the "Go to Document Processing Page" button click
  const handleGoToDocumentProcessing = () => {
    navigate(`/upload/${document}/processed-file`, { state: { file } }); // Navigate to the DocumentProcessingPage with the document parameter
  };

  return (
    <SidebarLayout>
      <div className="flex-1 p-8">
        <HeaderProfile />
        <div className="p-6 ">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <ChevronLeft size={20} />
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-8 py-4 bg-white border shadow-sm">
          <div className="flex items-center max-w-3xl mx-auto">
            <ProgressStep number="1" text="Upload Your File" completed />
            <ProgressStep number="2" text="Processing Files" />
            <ProgressStep number="3" text="Relabel Results" />
          </div>
        </div>

        {/* Upload Form */}
        <div className="p-6 bg-white border border-gray-300 shadow-sm">
          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Choose Upload Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value)}
                >
                  <option value="single-bank-upload">Single Bank Upload</option>
                  {/* <option value="multi-bank-upload">Multi Bank Upload</option> */}
                </select>
              </div>
            </div>

            <div className="col-span-2">
              <div>
                <div className="text-sm text-gray-600 mb-2">Document Type</div>
                <div className="text-blue-600 font-medium mb-4">{document}</div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                  <div className="flex flex-col items-center text-center">
                    <CloudUpload size={48} className="text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Drag and drop your file</h3>
                    {!file && (
                      <p className="text-sm text-gray-500 mb-4">
                        or <span
                          className="text-blue-600 hover:underline cursor-pointer"
                          onClick={handleBrowseClick} // Trigger file selection
                        >browse</span> to choose a file
                      </p>
                    )}
                    {!file && (
                      <p className="text-xs text-gray-500">
                        You can upload between 1 to 12 JPEG, JPG, PNG, PDF, CSV, ZIP, TIFF, TIF, HEIC files. Maximum size 25 MB per upload.
                        <br />Please upload only single ZIP files without any folders inside.
                      </p>
                    )}

                    {/* Hidden File Input */}
                    <input
                      ref={fileInputRef} // Attach the ref here
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      multiple
                    />

                    {/* Display the name of the selected file(s) */}
                    {file && (
                      <div className="mt-2 text-sm text-gray-600">
                        {Array.from(file).map((f, index) => (
                          <p key={index}>{f.name}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Show the upload progress bar */}
        {isUploading && (
          <div>
            <div className="w-full bg-gray-200 h-2.5 rounded-full">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <div className="mt-2 text-center text-sm text-gray-600">{`Uploading... ${uploadProgress}%`}</div>
          </div>
        )}

        {/* Button to go to Document Processing */}
        {/* Full-width Card Container for the Button */}
        {progressStep === 3 && !isUploading && (
          <div className="mt-0">
            {/* Card Container Full Width */}
            <div className="w-full bg-white border border-gray-300 shadow-lg p-6 ">
              <div className="flex justify-end">
                {/* Centered Button inside the Card */}
                <button
                  onClick={handleGoToDocumentProcessing} // Navigate to DocumentProcessingPage
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Proccess Document
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
};

// Define ProgressStep component
const ProgressStep = ({ number, text, completed, active }) => {
  return (
    <div className="flex items-center flex-1">
      <div className={`flex items-center justify-center w-6 h-6 rounded-full ${completed ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} text-sm`}>
        {number}
      </div>
      <div className={`ml-2 text-sm ${completed ? 'text-gray-900' : 'text-gray-500'}`}>{text}</div>
      <div className="flex-1 mx-4 h-px bg-gray-200" />
    </div>
  );
};

export default UploadPage;
