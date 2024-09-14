const request = require('supertest');
const app = require('../server');

describe('Event API', () => {
  it('should create a new event', async () => {
    const res = await request(app).post('/api/events').send({
      title: 'New Event',
      description: 'Event description',
      date: '2024-09-20',
      location: 'New York',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title');
  });
});
