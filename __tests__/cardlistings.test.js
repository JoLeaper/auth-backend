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
      email: 'yugi@pharaoh.com',
      password: 'millennium',
      profileImage: 'https://usercontent2.hubstatic.com/13388733.jpg'
    });

    const agent = request.agent(app);

    return agent
      .post('/api/v1/auth/login')
      .send({
        email: 'yugi@pharaoh.com',
        password: 'millennium'
      })
      .then(() => agent
        .post('/api/v1/cardlistings')
        .send({
          cardName: 'Dark Magician',
          cardRarity: 'Ultimate Rare',
          cardCost: 50,
          cardQuantity: 2,
        }))
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          seller: user.id,
          cardName: expect.any(String),
          cardRarity: expect.any(String),
          cardCost: expect.any(Number),
          cardQuantity: expect.any(Number),
          __v: 0
        });
      });
  });

  it('can get all the cards listed', async() => {
    const user = await User.create({
      email: 'yugi@pharaoh.com',
      password: 'millennium',
      profileImage: 'https://usercontent2.hubstatic.com/13388733.jpg'
    });

    const agent = request.agent(app);

    return agent
      .post('/api/v1/auth/login')
      .send({
        email: 'yugi@pharaoh.com',
        password: 'millennium'
      })
      .then(() => agent
        .post('/api/v1/cardlistings')
        .send({
          cardName: 'Dark Magician',
          cardRarity: 'Ultimate Rare',
          cardCost: 50,
          cardQuantity: 2,
        }))
      .then(() => {
        return agent.get('/api/v1/cardlistings')
     
          .then(res => {
            expect(res.body).toEqual(
              [{
                _id: expect.anything(),
                seller: user.id,
                cardName: expect.any(String),
                cardRarity: expect.any(String),
                cardCost: expect.any(Number),
                cardQuantity: expect.any(Number),
                __v: 0
              }]
            );
          });
      });
  }); 

});
