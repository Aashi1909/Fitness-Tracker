'use client';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ReportEntry {
  date: string;
  value: number;  // For sleep, it could be hours; for water, it could be liters
}

const ReportPage = () => {
  const router = useRouter();
  const { type } = router.query;  // 'sleep', 'water', etc.
  
  const [reportData, setReportData] = useState<ReportEntry[]>([]);
  const [newEntry, setNewEntry] = useState({ date: '', value: 0 });
  const [deleteDate, setDeleteDate] = useState('');

  useEffect(() => {
    if (type) {
      fetchReportData();
    }
  }, [type]);

  const fetchReportData = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/${type}track/getbydate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: null }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setReportData(data.data);
        } else {
          toast.error(`Failed to fetch ${type} data`);
        }
      })
      .catch((err) => {
        toast.error(`Error fetching ${type} data`);
        console.error(err);
      });
  };

  const handleAddEntry = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/${type}track/addentry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          toast.success(`${type} entry added successfully`);
          fetchReportData(); // Refresh data
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error(`Error adding ${type} entry`);
        console.error(err);
      });
  };

  const handleDeleteEntry = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/${type}track/deleteentry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: deleteDate }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          toast.success(`${type} entry deleted successfully`);
          fetchReportData(); // Refresh data
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error(`Error deleting ${type} entry`);
        console.error(err);
      });
  };

  const chartData = {
    labels: reportData.slice(-7).map((entry) => dayjs(entry.date).format('DD/MM')),
    datasets: [
      {
        label: type === 'sleep' ? 'Hours Slept' : 'Liters Drank', // Adjust label for different report types
        data: reportData.slice(-7).map((entry) => entry.value),
        backgroundColor: type === 'sleep' ? '#4CAF50' : '#2196F3', // Different colors for different report types
      },
    ],
  };

  return (
    <div className="report">
      <h1>{type.charAt(0).toUpperCase() + type.slice(1)} Report</h1>

      <div className="chart-container">
        <Bar data={chartData} />
      </div>

      <div className="add-entry">
        <h2>Add {type.charAt(0).toUpperCase() + type.slice(1)} Entry</h2>
        <input
          type="date"
          value={newEntry.date}
          onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
          placeholder="Date"
        />
        <input
          type="number"
          value={newEntry.value}
          onChange={(e) => setNewEntry({ ...newEntry, value: Number(e.target.value) })}
          placeholder={`Value (${type === 'sleep' ? 'hrs' : 'liters'})`}
        />
        <button onClick={handleAddEntry}>Add Entry</button>
      </div>

      <div className="delete-entry">
        <h2>Delete {type.charAt(0).toUpperCase() + type.slice(1)} Entry</h2>
        <input
          type="date"
          value={deleteDate}
          onChange={(e) => setDeleteDate(e.target.value)}
          placeholder="Date"
        />
        <button onClick={handleDeleteEntry}>Delete Entry</button>
      </div>
    </div>
  );
};

export default ReportPage;
