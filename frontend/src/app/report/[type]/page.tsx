"use client"
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import './ReportPage.css';
// import { color } from 'chart.js/helpers';
import { FaEdit } from 'react-icons/fa';  // Import the edit icon
import SleepEntryPopup from '@/components/SleepEntry/SleepEntryPopup'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SleepEntry {
  date: string;
  durationInHrs: number;
}

const SleepReport = () => {
  const [sleepData, setSleepData] = useState<SleepEntry[]>([]);
  const [newEntry, setNewEntry] = useState({ date: '', durationInHrs: 0 });
  const [deleteDate, setDeleteDate] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);  // To control popup visibility


  useEffect(() => {
    fetchSleepData();
  }, []);

  const fetchSleepData = () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API +'/sleeptrack/getsleepbydate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: null }), 
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "datatttata");
        if (data.ok) {
          setSleepData(data.data);
        } else {
          toast.error('Failed to fetch sleep data');
        }
      })
      .catch((err) => {
        toast.error('Error fetching sleep data');
        console.error(err);
      });
  };

  const handleAddSleep = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/sleeptrack/addsleepentry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          toast.success('Sleep entry added successfully');
          fetchSleepData(); 
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error('Error adding sleep entry');
        console.error(err);
      });
  };

  const handleDeleteSleep = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/sleeptrack/deletesleepentry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: deleteDate }),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "delete");
        if (data.ok) {
          toast.success('Sleep entry deleted successfully');
          fetchSleepData(); // Refresh data after deleting
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error('Error deleting sleep entry');
        console.error(err);
      });
  };

 // Helper function to aggregate sleep data 
const aggregateSleepData = (sleepData: SleepEntry[]) => {
  const sleepObj: Record<string, number> = {};

  // Single pass to aggregate data
  sleepData.forEach((entry) => {
    const formattedDate = dayjs(entry.date).format('YYYY-MM-DD'); 

    // Sum hours for duplicate dates
    sleepObj[formattedDate] = (sleepObj[formattedDate] || 0) + entry.durationInHrs;
  });

  return Object.entries(sleepObj)
    .map(([date, durationInHrs]) => ({ date, durationInHrs }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Aggregate and sort sleep data
const sortedSleepData = aggregateSleepData(sleepData);

const chartData = {
  labels: sortedSleepData.slice(-10).map((entry) => dayjs(entry.date).format('DD/MM')), 
  datasets: [
    {
      label: 'Hours Slept',
      data: sortedSleepData.slice(-10).map((entry) => entry.durationInHrs), 
      backgroundColor: '#e0c34c',
    },
  ],
};

const chartOptions = {
  scales: {
    x: {
      title: {
        display: true,
        text: 'Date',
        color: 'black',
        font: {
          weight: 'bold', 
        },
      },
    },
    y: {
      title: {
        display: true,
        text: 'Duration in Hours',
        color: 'black',
        font: {
          weight: 'bold', 
        },

      },
      min: 0, 
    },
  },
};



return (
  <div className={`sleep-report ${isPopupOpen ? 'blur-background' : ''}`}> {/* Blur background when popup is open */}
    <h1>Sleep Report</h1>

    <div className="summary">
      <p>
        Use the chart to visualize your sleep data for the past week, empowering you to make healthier choices for better rest.
      </p>
    </div>

    <div className="chart-container">
      <Bar data={chartData} options={chartOptions} />
    </div>

    <div className="edit-icon" onClick={() => setIsPopupOpen(true)}>
      <FaEdit size={40} />
    </div>

    {isPopupOpen && (
      <SleepEntryPopup
        onClose={() => setIsPopupOpen(false)} 
        onAddSleep={handleAddSleep}
        newEntry={newEntry}
        setNewEntry={setNewEntry}
        onDeleteSleep={handleDeleteSleep}
        deleteDate={deleteDate}
        setDeleteDate={setDeleteDate}
      />
    )}
  </div>
);
};

export default SleepReport;