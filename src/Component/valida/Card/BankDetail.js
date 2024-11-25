import React from 'react';

const FileDetailsCard = ({
  logo,
  titleName,
  createdBy,
  fileUploaded,
  accountNumber,
  address,
  period,
  bankName
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:items-start">
    {/* Logo on the left */}
    <div className="w-16 h-16 flex justify-center items-center bg-gray-200 rounded-full mb-4 sm:mb-0 sm:mr-6">
      <img src={logo} alt="Logo" className="w-full h-full object-contain" />
    </div>

    {/* Card Content */}
    <div className="flex-1">
      {/* First Row: Title Name, Created By, File Uploaded */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <div className="font-semibold">Title Name:</div>
          <div className="text-sm text-gray-500">{titleName}</div>
        </div>
        <div>
          <div className="font-semibold">Created By:</div>
          <div className="text-sm text-gray-500">{createdBy}</div>
        </div>
        <div>
          <div className="font-semibold">Files Uploaded:</div>
          <div className="text-sm text-gray-500">{fileUploaded}</div>
        </div>
      </div>

      {/* Second Row: Account Number, Address, Period */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <div className="font-semibold">Account Number:</div>
          <div className="text-sm text-gray-500">{accountNumber}</div>
        </div>
        <div>
          <div className="font-semibold">Address:</div>
          <div className="text-sm text-gray-500">{address}</div>
        </div>
        <div>
          <div className="font-semibold">Period:</div>
          <div className="text-sm text-gray-500">{period}</div>
        </div>
      </div>

      {/* Third Row: Bank Name */}
      <div>
        <div className="font-semibold">Bank Name:</div>
        <div className="text-sm text-gray-500">{bankName}</div>
      </div>
    </div>
  </div>
);

export default FileDetailsCard;
