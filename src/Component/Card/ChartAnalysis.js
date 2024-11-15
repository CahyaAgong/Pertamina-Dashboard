// FileAnalysisDashboard.js
import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import Chart from 'chart.js/auto'; // Import the Chart.js library


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

const FileAnalysisDashboard = ({ pieData, barData, lineData, fileDetails }) => {
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);

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
    <div className="min-h-screen p-6 rounded-lg"> {/* Light gray background for the whole page */}
      <h1 className="text-2xl font-semibold text-[#1E3A8A] text-center mb-6">File Analysis Dashboard</h1>


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
  );
};

export default FileAnalysisDashboard;
