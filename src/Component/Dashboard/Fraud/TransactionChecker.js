import React, { useState } from 'react';

const TransactionChecker = ({ transactions }) => {
  const [suspectedFraud, setSuspectedFraud] = useState([]);

  const detectFraud = () => {
    const fraudAlerts = [];

    transactions.forEach((transaction, index) => {
      const previousTransaction = transactions[index - 1];
      
      // Check for missing balance (empty balance)
      if (!transaction.balance || transaction.balance === '') {
        fraudAlerts.push({
          message: `Missing balance for transaction on ${transaction.date}.`,
          transaction,
        });
      }

      // Check for large fluctuations in balance (more than a threshold, e.g., 100M)
      if (previousTransaction) {
        const balanceChange = Math.abs(
          parseFloat(transaction.balance.replace(/[^0-9.-]+/g, '')) - parseFloat(previousTransaction.balance.replace(/[^0-9.-]+/g, ''))
        );
        
        if (balanceChange > 100000000) {
          fraudAlerts.push({
            message: `Large fluctuation in balance from ${previousTransaction.balance} to ${transaction.balance} on ${transaction.date}.`,
            transaction,
          });
        }
      }

      // Check for strange descriptions (e.g., unknown names, odd patterns)
      if (/wnsr|TANGGAL|unknown/i.test(transaction.description)) {
        fraudAlerts.push({
          message: `Unusual description found on ${transaction.date}: ${transaction.description}.`,
          transaction,
        });
      }

      // Check for repetitive names in the transaction description
      if (/HENRY SISWANTO HAD/i.test(transaction.description) && !transaction.description.includes('bkl')) {
        fraudAlerts.push({
          message: `Multiple transactions involving the same party (HENRY SISWANTO HAD) on ${transaction.date}.`,
          transaction,
        });
      }
    });

    setSuspectedFraud(fraudAlerts);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Transaction Fraud Detection</h1>
        <button
          onClick={detectFraud}
          className="w-full py-2 bg-blue-600 text-white rounded-lg mb-6 hover:bg-blue-700 transition duration-300"
        >
          Detect Fraud
        </button>
        
        {suspectedFraud.length > 0 ? (
          <div className="space-y-4">
            {suspectedFraud.map((alert, index) => (
              <div
                key={index}
                className="bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500"
              >
                <strong className="text-yellow-600">{alert.message}</strong>
                <pre className="text-sm text-gray-700 mt-2">{JSON.stringify(alert.transaction, null, 2)}</pre>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No suspicious activity detected.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionChecker