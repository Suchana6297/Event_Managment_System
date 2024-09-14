const request = require('supertest');
const app = require('../app'); // This is your Express app
const mongoose = require('mongoose');
const Attendee = require('../models/Attendee'); // Your Attendee model
const Event = require('../models/Event'); // Event model for testing event creation

// Connect to the test database before running the tests
beforeAll(async () => {
  const url = `mongodb://127.0.0.1/event-management-test`; // Test database URL
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clear the test database after each test
afterEach(async () => {
  await Attendee.deleteMany();
  await Event.deleteMany();
});

// Disconnect from the test database after all tests are done
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Attendee API', () => {
  let event;

  // Set up an event for attendees to RSVP to
  beforeEach(async () => {
    event = new Event({
      title: 'Test Event',
      description: 'This is a test event',
      date: new Date(),
    });
    await event.save();
  });

  it('should RSVP an attendee to an event', async () => {
    const attendeeData = {
      name: 'John Doe',
      email: 'john@example.com',
      event: event._id,
      rsvp: true,
    };

    const res = await request(app)
      .post('/api/attendees')
      .send(attendeeData);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'RSVP successful');
    expect(res.body.attendee).toHaveProperty('name', 'John Doe');
    expect(res.body.attendee).toHaveProperty('email', 'john@example.com');
  });

  it('should not RSVP an attendee if the email is missing', async () => {
    const attendeeData = {
      name: 'John Doe',
      event: event._id,
      rsvp: true,
    };

    const res = await request(app)
      .post('/api/attendees')
      .send(attendeeData);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Email is required');
  });

  it('should fetch all attendees for an event', async () => {
    // Add a few attendees
    const attendee1 = new Attendee({ name: 'Alice', email: 'alice@example.com', event: event._id, rsvp: true });
    const attendee2 = new Attendee({ name: 'Bob', email: 'bob@example.com', event: event._id, rsvp: true });
    await attendee1.save();
    await attendee2.save();

    const res = await request(app)
      .get(`/api/events/${event._id}/attendees`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
    expect(res.body[0]).toHaveProperty('name', 'Alice');
    expect(res.body[1]).toHaveProperty('name', 'Bob');
  });

  it('should delete an attendee', async () => {
    const attendee = new Attendee({ name: 'Charlie', email: 'charlie@example.com', event: event._id, rsvp: true });
    await attendee.save();

    const res = await request(app)
      .delete(`/api/attendees/${attendee._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Attendee deleted successfully');
  });

  it('should not delete a non-existent attendee', async () => {
    const nonExistentId = mongoose.Types.ObjectId();

    const res = await request(app)
      .delete(`/api/attendees/${nonExistentId}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'Attendee not found');
  });
});
