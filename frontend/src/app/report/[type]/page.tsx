import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
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

  const fetchSleepData = async () => {
    try {
      const response = await axios.post('/api/sleep/getsleepbydate', { date: null });
      setSleepData(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch sleep data');
    }
  };

  const handleAddSleep = async () => {
    try {
      await axios.post('/api/sleep/addsleepentry', newEntry);
      toast.success('Sleep entry added successfully');
      fetchSleepData();  // Refresh data after adding
    } catch (error) {
      toast.error('Error adding sleep entry');
    }
  };

  const handleDeleteSleep = async () => {
    try {
      await axios.post('/api/sleep/deletesleepentry', { date: deleteDate });
      toast.success('Sleep entry deleted successfully');
      fetchSleepData();  // Refresh data after deleting
    } catch (error) {
      toast.error('Error deleting sleep entry');
    }
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
