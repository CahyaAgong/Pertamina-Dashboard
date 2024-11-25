import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import Chart from 'chart.js/auto'; // Import the Chart.js library
import SidebarLayout from '../Component/Sidebar/Layout';
import FileDetailsCard from '../Component/Card/BankDetail';

// Register the necessary chart components for usage
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const FileAnalysisDashboard = () => {
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);

  // Dummy Data for Charts
  const pieData = {
    labels: ['BANK A', 'BANK B', 'BANK C'],
    datasets: [
      {
        data: [50, 25, 25],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Updated Bar Data: Cash Flow for the Last 6 Months
  const barData = {
    labels: ['May', 'June', 'July', 'August', 'September', 'October'],
    datasets: [
      {
        label: 'Cash Flow',
        data: [1200, 800, 1500, 400, 1000, 200], // Example cash flow values (positive for inflow, negative for outflow)
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'], // Different colors for each bar
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'Revenue',
        data: [200, 400, 300],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  useEffect(() => {
    // Destroy the existing charts before creating new ones
    const destroyChart = (chartRef) => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
    };

    // Create new charts after destroying previous ones
    destroyChart(pieChartRef);
    destroyChart(barChartRef);
    destroyChart(lineChartRef);

    const pie = new Chart(pieChartRef.current, {
      type: 'pie',
      data: pieData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    const bar = new Chart(barChartRef.current, {
      type: 'bar',
      data: barData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    const line = new Chart(lineChartRef.current, {
      type: 'line',
      data: lineData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    // Cleanup function to destroy charts when the component is unmounted or when data changes
    return () => {
      pie.destroy();
      bar.destroy();
      line.destroy();
    };
  }, [pieData, barData, lineData]); // Re-run effect if data changes

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-[#F9FAFB] p-6 rounded-lg"> {/* Light gray background for the whole page */}
        <h1 className="text-2xl font-semibold text-[#1E3A8A] text-center mb-6">File Analysis Dashboard</h1>

        {/* FileDetailsCard with margin below */}
        <FileDetailsCard
          logo="https://via.placeholder.com/150" // Replace with your logo URL
          titleName="Client 123"
          createdBy="John Doe"
          fileUploaded="25"
          filesUploadedCount="50"
          accountNumber="123-456-789"
          address="1234 Main St, City, Country"
          period="2024-01"
          bankName="BCA"
        />

        {/* Chart Grid Layout with margin top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-xl border border-[#E5E7EB]">
            <h2 className="text-xl font-semibold text-[#111827] mb-4">Data Distribution (Pie Chart)</h2>
            <div className="h-56">
              <canvas ref={pieChartRef}></canvas>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-xl border border-[#E5E7EB]">
            <h2 className="text-xl font-semibold text-[#111827] mb-4">Cash Flow (Bar Chart)</h2>
            <div className="h-56">
              <canvas ref={barChartRef}></canvas>
            </div>
          </div>
        </div>

        {/* Line Chart Section (Single Column) */}
        <div className="bg-white p-6 rounded-lg shadow-xl border border-[#E5E7EB] mt-6">
          <h2 className="text-xl font-semibold text-[#111827] mb-4">Revenue Trend (Line Chart)</h2>
          <div className="h-56">
            <canvas ref={lineChartRef}></canvas>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default FileAnalysisDashboard;
