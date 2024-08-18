import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import * as XLSX from 'xlsx';
import html2pdf from 'html2pdf.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Dummy data for demonstration
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      data: [30, 45, 25, 60, 50, 70, 90],
      fill: false,
      borderColor: '#4B5563',
      tension: 0.1
    }
  ]
};

// Chart options for size reduction
const options = {
  maintainAspectRatio: false, // Allows for custom sizing
};

function Reports() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDownloadPDF = () => {
    const element = document.getElementById('report');
    html2pdf().from(element).save('report.pdf');
  };

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet([
      { Month: 'January', Sales: 30 },
      { Month: 'February', Sales: 45 },
      { Month: 'March', Sales: 25 },
      { Month: 'April', Sales: 60 },
      { Month: 'May', Sales: 50 },
      { Month: 'June', Sales: 70 },
      { Month: 'July', Sales: 90 }
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sales Report');
    XLSX.writeFile(wb, 'report.xlsx');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Date Range Filter</h3>
        <div className="flex space-x-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded-lg"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded-lg"
          />
          <button
            onClick={() => alert(`Filtering from ${startDate} to ${endDate}`)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Filter
          </button>
        </div>
      </div>

      <div id="report" className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Sales Report</h3>
        <div style={{ width: '900px', height: '280px' }}>
          <Line data={data} options={options} />
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Download PDF
        </button>
        <button
          onClick={handleDownloadExcel}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
        >
          Download Excel
        </button>
      </div>
    </div>
  );
}

export default Reports;
