const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

describe('auth routes', () => {
  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });

  it('can create a new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'jjjj@jj.com',
        password: 'password1234',
        profileImage: 'https://usercontent2.hubstatic.com/13388733.jpg'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          email: 'jjjj@jj.com',
          profileImage: 'https://usercontent2.hubstatic.com/13388733.jpg'
        });
      });
  });
});
