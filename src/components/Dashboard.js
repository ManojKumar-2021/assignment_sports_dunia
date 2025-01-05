import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css'; // For additional styling
import {Link } from 'react-router-dom'; 

// Register necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [authors] = useState([
    { name: 'John Doe', numArticles: 5 },
    { name: 'Jane Smith', numArticles: 3 },
    { name: 'Unknown', numArticles: 2 },
  ]);

  const [payoutPerArticle, setPayoutPerArticle] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Function to export payout data to PDF
  const handleExportToPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.text('Payout Report', 14, 10);

    // Add table
    const tableColumn = ['Author Name', 'Number of Articles', 'Payout per Article (Rs)', 'Total Payout (Rs)'];
    const tableRows = authors.map((author) => [
      author.name,
      author.numArticles,
      payoutPerArticle,
      author.numArticles * payoutPerArticle,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('payout-report.pdf');
  };

  // Bar Chart Data
  const barChartData = {
    labels: authors.map((author) => author.name),
    datasets: [
      {
        label: 'Number of Articles',
        data: authors.map((author) => author.numArticles),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: '#4D4D4D',
        borderWidth: 1,
      },
    ],
  };

  // Bar Chart Options
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#fff' : '#000',
        },
      },
      title: {
        display: true,
        text: 'Articles by Author',
        color: isDarkMode ? '#fff' : '#000',
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? '#fff' : '#000',
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? '#fff' : '#000',
        },
      },
    },
  };

  return (<>
            <nav className="navbar">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/home" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              </li>
            </ul>
          </nav>
  
    <div className={isDarkMode ? 'dashboard dark-mode' : 'dashboard'}>
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </header>

      <div>
        <label>
          Payout per Article (Rs):{' '}
          <input
            type="number"
            value={payoutPerArticle}
            onChange={(e) => setPayoutPerArticle(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '16px', marginLeft: '10px' }}
          />
        </label>
      </div>

      <table
        border="1"
        style={{
          width: '100%',
          marginTop: '20px',
          borderCollapse: 'collapse',
          textAlign: 'center',
          backgroundColor: isDarkMode ? '#333' : '#fff',
          color: isDarkMode ? '#fff' : '#000',
        }}
      >
        <thead style={{ backgroundColor: isDarkMode ? '#444' : '#f2f2f2' }}>
          <tr>
            <th>Author Name</th>
            <th>Number of Articles</th>
            <th>Payout per Article (Rs)</th>
            <th>Total Payout (Rs)</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author, index) => (
            <tr key={index}>
              <td>{author.name}</td>
              <td>{author.numArticles}</td>
              <td>{payoutPerArticle}</td>
              <td>{author.numArticles * payoutPerArticle}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleExportToPDF}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: isDarkMode ? '#007BFF' : '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Export to PDF
      </button>

      <div style={{ marginTop: '40px', width: '100%', maxWidth: '600px' }}>
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </div>
    </>
  );
};

export default Dashboard;
