const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

beforeAll(async () => {
  // Connect to a test database
  await mongoose.connect(process.env.TEST_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Disconnect from the test database
  await mongoose.connection.close();
});

describe('Message API', () => {
  test('POST /api/messages/send should send a message', async () => {
    const res = await request(app)
      .post('/api/messages/send')
      .send({
        to: '+1234567890',
        templateName: 'hello_world',
        templateData: {}
      });
    expect(res.statusCode).toBe(200);
  });

  test('GET /api/messages/history should return message history', async () => {
    const res = await request(app).get('/api/messages/history');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});