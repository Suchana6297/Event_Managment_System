import React, { useEffect, useState } from 'react';
import eventService from '../services/eventService';

const EventDetail = ({ match }) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await eventService.getEvent(match.params.id);
      setEvent(response.data);
    };
    fetchEvent();
  }, [match.params.id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>{event.date}</p>
    </div>
  );
};

export default EventDetail;
