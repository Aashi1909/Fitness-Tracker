import React from 'react';
import './SleepEntryPopup.css'; // Create a CSS file for styling

interface SleepEntryPopupProps {
  onClose: () => void;
  onAddSleep: () => void;
  onDeleteSleep: () => void;
  newEntry: { date: string; durationInHrs: number };
  setNewEntry: (entry: { date: string; durationInHrs: number }) => void;
  deleteDate: string;
  setDeleteDate: (date: string) => void;
}

const SleepEntryPopup: React.FC<SleepEntryPopupProps> = ({
  onClose,
  onAddSleep,
  onDeleteSleep,
  newEntry,
  setNewEntry,
  deleteDate,
  setDeleteDate,
}) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>X</button>
        
        <h2>Add Sleep Entry</h2>
        <h5>Date</h5>
        <input
          type="date"
          value={newEntry.date}
          onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
          placeholder="Date"
        />
        <br />
        <h5>Duration</h5>
        <input
          type="number"
          value={newEntry.durationInHrs}
          onChange={(e) => setNewEntry({ ...newEntry, durationInHrs: Number(e.target.value) })}
          placeholder="Duration (hrs)"
        />
        <button onClick={onAddSleep}>Add Entry</button>

        <h2>Delete Sleep Entry</h2>
        <h5>Date</h5>
        <input
          type="date"
          value={deleteDate}
          onChange={(e) => setDeleteDate(e.target.value)}
          placeholder="Date"
        />
        <button onClick={onDeleteSleep}>Delete Entry</button>
      </div>
    </div>
  );
};

export default SleepEntryPopup;
