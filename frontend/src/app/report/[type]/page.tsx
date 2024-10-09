import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

interface SleepEntry {
  date: string;
  durationInHrs: number;
}

const SleepReport = () => {
  const [sleepData, setSleepData] = useState<SleepEntry[]>([]);
  const [newEntry, setNewEntry] = useState({ date: '', durationInHrs: 0 });
  const [deleteDate, setDeleteDate] = useState('');

  useEffect(() => {
    fetchSleepData();
  }, []);

  const fetchSleepData = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/sleeptrack/getsleepbydate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: null }), // sending null to fetch recent data
    })
      .then((res) => res.json())
      .then((data) => {
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
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          toast.success('Sleep entry added successfully');
          fetchSleepData(); // Refresh data after adding
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
    })
      .then((res) => res.json())
      .then((data) => {
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

  // Prepare chart data
  const chartData = {
    labels: sleepData.slice(-7).map((entry) => dayjs(entry.date).format('DD/MM')),
    datasets: [
      {
        label: 'Hours Slept',
        data: sleepData.slice(-7).map((entry) => entry.durationInHrs),
        backgroundColor: '#4CAF50',
      },
    ],
  };

  return (
    <div className="sleep-report">
      <h1>Sleep Report</h1>

      {/* Bar Chart */}
      <div className="chart-container">
        <Bar data={chartData} />
      </div>

      {/* Add Sleep Entry */}
      <div className="add-sleep-entry">
        <h2>Add Sleep Entry</h2>
        <input
          type="date"
          value={newEntry.date}
          onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
          placeholder="Date"
        />
        <input
          type="number"
          value={newEntry.durationInHrs}
          onChange={(e) => setNewEntry({ ...newEntry, durationInHrs: Number(e.target.value) })}
          placeholder="Duration (hrs)"
        />
        <button onClick={handleAddSleep}>Add Entry</button>
      </div>

      {/* Delete Sleep Entry */}
      <div className="delete-sleep-entry">
        <h2>Delete Sleep Entry</h2>
        <input
          type="date"
          value={deleteDate}
          onChange={(e) => setDeleteDate(e.target.value)}
          placeholder="Date"
        />
        <button onClick={handleDeleteSleep}>Delete Entry</button>
      </div>
    </div>
  );
};

export default SleepReport;
