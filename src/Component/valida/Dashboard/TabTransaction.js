import React, { useState } from 'react';
import { Info } from 'lucide-react';
import transactionData from '../Rekening.json'; // Ensure this file contains valid data
import FraudData from '../Transaction.json'; // Ensure this file contains valid data
import TransactionDetail from '../DynamicForm/TransactionDetail';
import RekeningDetail from '../JSON/AnalisaRekeningKoran.json'

const AnalyticsTransaction = () => {
  
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
            description="We have detected several issues with the uploaded files. Please be aware that these files may contain potentially fraudulent data, which requires your prompt attention."
            icon={<Info size={16} />}
          >
            {/* Display Fraud Alerts or No Fraud Message */}
            <div>
              <table className="w-full table-auto border-collapse mt-4">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">NO</th>
                    <th className="px-4 py-2 text-left">INDICATOR</th>
                    <th className="px-4 py-2 text-left">RESULT</th>
                    <th className="px-4 py-2 text-left">FILE</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { indicator: "PDF Creator", value: "Microsoft Reporting Services 13.0.0.0" },
                    { indicator: "Account Number", value: "34001099204508" },
                    { indicator: "Admin Charge", value: "Charge on 2023 july 20" },
                    { indicator: "Atm Withdrawal", value: "there is no atm Withdrawal in This file" },
                    { indicator: "RTGS transfer", value: "there is no RTGS transfer in This file" },
                    { indicator: "Ending Balance", value: "No Odd Ending Balance Nominal found" }
                  ].map((row, index) => {
                    // Random File Names
                    const randomFile = `raw_statement/${Math.floor(Math.random() * 100000000000000000)}.pdf`;

                    return (
                      <tr key={index}>
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{row.indicator}</td>
                        <td className="px-4 py-2">{row.value}</td>
                        <td className="px-4 py-2">
                          <a
                            href={`/${randomFile}`} // Link to the file
                            className="text-blue-500 hover:text-blue-700"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {randomFile}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Transaction Summary Section */}
          <Section
            title="Transaction Summary"
            icon={<Info size={16} />}
          >
            <div className="grid grid-cols-4 gap-8">
              {RekeningDetail.map((item, index) => (
                <SummaryCard
                  key={index}
                  title={item.Description}
                  value={item.Value.toLocaleString()}
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
            <TransactionDetail data={RekeningDetail}/>
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
      <div className={`text-lg font-medium ${textColor}`}>
        {value}
      </div>
    </div>
  </div>
);

export default AnalyticsTransaction;
