require('dotenv').config();

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

  it('can create a new card listing', async() => {
    const user = await User.create({
      email: 'jjjj@jj.com',
      password: 'password1234',
      profileImage: 'https://usercontent2.hubstatic.com/13388733.jpg'
    });

    const agent = request.agent(app);

    return agent
      .post('/api/v1/auth/login')
      .send({
        email: 'yugi@pharaoh.com',
        password: 'millennium'
      })
      .then(() => agent)
      .post('/api/v1/newCard')
      .send({
        seller: user._id,
        cardName: 'Dark Magician',
        cardRarity: 'Ultimate Rare',
        cardCost: 50,
        cardQuantity: 2,
      })
      .then(res => {
        expect(res.body).toEqual({
          seller: user._id,
          cardName: expect.any(String),
          cardRarity: expect.any(String),
          cardCost: expect.any(Number),
          cardQuantity: expect.any(Number),
        });
      });
  });
});
