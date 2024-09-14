import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import eventService from '../services/eventService';
import './Home.css'; // Assuming there's a CSS file for styling this page

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  // Fetch upcoming events when the component loads
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      const response = await eventService.getEvents();
      // Assuming the events have a `date` field and we show the first 3 upcoming events
      const sortedEvents = response.data
        .filter(event => new Date(event.date) > new Date())
        .slice(0, 3);
      setUpcomingEvents(sortedEvents);
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to the Event Management System</h1>
        <p>Manage your events efficiently and stay organized.</p>
        <Link to="/events" className="view-events-button">View All Events</Link>
      </header>

      <section className="upcoming-events">
        <h2>Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <ul className="event-list">
            {upcomingEvents.map(event => (
              <li key={event.id} className="event-item">
                <Link to={`/event/${event.id}`}>
                  <h3>{event.name}</h3>
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming events at the moment. <Link to="/events">View all events</Link></p>
        )}
      </section>
    </div>
  );
};

export default Home;
