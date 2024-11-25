import React, { useState, useEffect } from 'react';
import sampleData from '../../Component/Transaction.json';

const DynamicTableWithPagination = () => {
  // State to handle the current page, sorted data, and pagination limit
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const rowsPerPage = 10; // Rows per page

  // Sort data by date in ascending order (earliest date first)
  const sortDataAscending = (data) => {
    return data.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Paginate data
  const paginateData = (data) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Apply sorting and pagination
  useEffect(() => {
    const sortedData = sortDataAscending(sampleData); // Sort the data in ascending order by date
    const paginatedData = paginateData(sortedData); // Paginate the sorted data
    setData(paginatedData);
  }, [currentPage]); // Re-run when currentPage changes

  // Dynamically extract the headers from the first row of the data
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="flex justify-center p-8 bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-7xl"> {/* Increase width here */}
        {/* Card Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Transaction Data</h3>
          {/* <button className="text-blue-600">Get Help</button> */}
        </div>

        {/* Table Description */}
        <p className="text-gray-500 text-sm mb-4">Shows transaction details sorted by date, with pagination controls.</p>

        {/* Table with dynamic headers and rows */}
        <table className="w-full table-auto">
          <thead className="bg-gray-200 text-left">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-6 py-3">{header.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-b">
                  {headers.map((header, i) => (
                    <td key={i} className="px-6 py-4">{item[header] || '-'}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center py-4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            className={`px-4 py-2 ${currentPage > 1 ? 'bg-blue-600 text-white' : 'bg-gray-400 text-gray-700'} rounded`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage}
          </span>
          <button
            className={`px-4 py-2 ${data.length === rowsPerPage ? 'bg-blue-600 text-white' : 'bg-gray-400 text-gray-700'} rounded`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={data.length < rowsPerPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicTableWithPagination;
