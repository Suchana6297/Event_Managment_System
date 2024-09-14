import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import eventService from '../services/eventService';
import './EventDetail.css'; // Assuming you will style it with a CSS file

const EventDetail = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null); // Store event data
  const [loading, setLoading] = useState(true); // Loading state
  const [rsvpStatus, setRsvpStatus] = useState(''); // RSVP status tracking

  // Fetch event data when component mounts
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await eventService.getEvent(id);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch event data:', error);
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [id]);

  // Handle RSVP action
  const handleRsvp = async (status) => {
    try {
      // Assuming you have an RSVP API endpoint in eventService
      await eventService.rsvpEvent(id, status);
      setRsvpStatus(status);
    } catch (error) {
      console.error('Failed to RSVP:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div className="event-detail-container">
      <header className="event-detail-header">
        <h1>{event.name}</h1>
        <p>{new Date(event.date).toLocaleDateString()}</p>
      </header>

      <section className="event-description">
        <h2>About this Event</h2>
        <p>{event.description}</p>
      </section>

      <section className="event-attendees">
        <h2>Attendees</h2>
        {event.attendees && event.attendees.length > 0 ? (
          <ul>
            {event.attendees.map(attendee => (
              <li key={attendee.id}>{attendee.name}</li>
            ))}
          </ul>
        ) : (
          <p>No attendees yet.</p>
        )}
      </section>

      <section className="event-actions">
        <h2>RSVP</h2>
        {rsvpStatus ? (
          <p>You have RSVP'd: {rsvpStatus}</p>
        ) : (
          <>
            <button onClick={() => handleRsvp('yes')} className="rsvp-button yes">Yes</button>
            <button onClick={() => handleRsvp('no')} className="rsvp-button no">No</button>
            <button onClick={() => handleRsvp('maybe')} className="rsvp-button maybe">Maybe</button>
          </>
        )}
      </section>

      <footer className="event-detail-footer">
        <Link to="/events" className="back-link">Back to Events</Link>
      </footer>
    </div>
  );
};

export default EventDetail;
