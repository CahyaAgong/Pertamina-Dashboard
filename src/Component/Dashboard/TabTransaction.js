import React, { useState } from 'react';
import { Info } from 'lucide-react';
import transactionData from '../Rekening.json'; // Ensure this file contains valid data
import FraudData from '../Transaction.json'; // Ensure this file contains valid data

const AnalyticsTransaction = () => {
  const creditTransactionTotal = transactionData.find(item => item.header === 'Total Credit Transactions')?.value || 0;
  const debitTransactionTotal = transactionData.find(item => item.header === 'Total Debit Transactions')?.value || 0;
  // State to manage fraud alerts and visibility of the fraud section
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [isFraudDetected, setIsFraudDetected] = useState(false);
  const [page, setPage] = useState(1); // For pagination
  const itemsPerPage = 3;

  // Function to detect fraud in the transaction data
  const detectFraud = () => {
    const fraudAlertsList = [];
    
    // Loop through transactions and check for suspicious activity
    FraudData.forEach((transaction, index) => {
      const previousTransaction = FraudData[index - 1];

      // 1. Check for missing balance (empty or undefined balance)
      if (!transaction.balance || transaction.balance === '') {
        fraudAlertsList.push({
          message: `Missing balance for transaction on ${transaction.date}.`,
          transaction,
        });
      }

      // 2. Check for large fluctuations in balance (e.g., change greater than 100M)
      if (previousTransaction) {
        const balanceChange = Math.abs(
          parseFloat(transaction.balance.replace(/[^0-9.-]+/g, '')) - parseFloat(previousTransaction.balance.replace(/[^0-9.-]+/g, ''))
        );
        
        if (balanceChange > 100000000) {
          fraudAlertsList.push({
            message: `Large fluctuation in balance from ${previousTransaction.balance} to ${transaction.balance} on ${transaction.date}.`,
            transaction,
          });
        }
      }

      // 3. Check for unusual descriptions (e.g., odd patterns or strange names)
      if (/wnsr|TANGGAL|unknown/i.test(transaction.description)) {
        fraudAlertsList.push({
          message: `Unusual description found on ${transaction.date}: ${transaction.description}.`,
          transaction,
        });
      }

      // 4. Check for repetitive names in the description (e.g., same party involved multiple times)
      if (/HENRY SISWANTO HAD/i.test(transaction.description) && !transaction.description.includes('bkl')) {
        fraudAlertsList.push({
          message: `Multiple transactions involving the same party (HENRY SISWANTO HAD) on ${transaction.date}.`,
          transaction,
        });
      }
    });

    setFraudAlerts(fraudAlertsList);
    setIsFraudDetected(true); // Fraud detected, so update state to show alerts
  };

  // Pagination logic
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Get the fraud alerts for the current page
  const displayedFraudAlerts = fraudAlerts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1">
        <div className="p-4 space-y-6">
          {/* Fraud Detection Section */}
          <Section
            title="Fraud Detection"
            description="We identified multiple issues concerning the uploaded files. Please note that these files might contain fraudulent information which requires your immediate attention."
            icon={<Info size={16} />}
          >
            {!isFraudDetected && (
              <div className="text-center mb-4">
                <button
                  onClick={detectFraud}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Detect Fraud
                </button>
              </div>
            )}

            {/* Display Fraud Alerts or No Fraud Message */}
            {fraudAlerts.length > 0 ? (
              <div>
                <table className="w-full table-auto border-collapse mt-4">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">NO</th>
                      <th className="px-4 py-2 text-left">DATE</th>
                      <th className="px-4 py-2 text-left">DESCRIPTION</th>
                      <th className="px-4 py-2 text-left">Transaction</th>
                      <th className="px-4 py-2 text-left">FRAUD INDICATOR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedFraudAlerts.map((alert, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2">{(page - 1) * itemsPerPage + index + 1}</td>
                        <td className="px-4 py-2">{alert.transaction.date}</td>
                        <td className="px-4 py-2">{alert.transaction.description}</td>
                        <td className="px-4 py-2">{alert.transaction.balance || "N/A"}</td>
                        <td className="px-4 py-2 text-red-600">{alert.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-center space-x-2 mt-4">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-gray-600">Page {page}</span>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page * itemsPerPage >= fraudAlerts.length}
                    className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null}
          </Section>

          {/* Transaction Summary Section */}
          <Section
            title="Transaction Summary"
            icon={<Info size={16} />}
          >
            <div className="grid grid-cols-4 gap-8">
              {transactionData.map((item, index) => (
                <SummaryCard
                  key={index}
                  title={item.header}
                  value={item.value.toLocaleString()}
                  textColor={item.textColor || "text-gray-900"}
                />
              ))}
            </div>
          </Section>

          {/* Transaction Detail Section */}
          <Section
            title="Transaction Detail"
            icon={<Info size={16} />}
          >
            <div className="grid grid-cols-2 gap-8">
              {/* Credit Transactions */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="font-medium mb-2">Credit Transaction Breakdown</h3>
                <p className="text-sm text-gray-500 mb-4">Total revenue breakdown based on available data</p>
                <div className="relative w-48 h-48 mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{creditTransactionTotal.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">Total</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Debit Transactions */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="font-medium mb-2">Debit Transaction Breakdown</h3>
                <p className="text-sm text-gray-500 mb-4">Overall cost breakdown based on available data</p>
                <div className="relative w-48 h-48 mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{debitTransactionTotal.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">Total</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

// Section component to encapsulate content blocks
const Section = ({ title, description, icon, children }) => (
  <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
    <div className="flex items-center space-x-2 mb-2">
      <h2 className="text-lg font-medium">{title}</h2>
      {icon}
    </div>
    {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
    {children}
  </div>
);

// Summary Card to show transaction summary information
const SummaryCard = ({ title, value, textColor = "text-gray-900" }) => (
  <div className="w-full">
    <div className="flex flex-col">
      <div className="text-sm text-gray-600">{title}</div>
      <div className={`text-lg font-medium ${textColor} text-center`}>
        {value}
      </div>
    </div>
  </div>
);

export default AnalyticsTransaction;
