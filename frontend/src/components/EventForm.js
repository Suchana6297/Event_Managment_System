import React, { useState } from 'react';
import eventService from '../../services/eventService';

function EventForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await eventService.createEvent(formData);
    onSubmitSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <button type="submit">Create Event</button>
    </form>
  );
}

export default EventForm;
