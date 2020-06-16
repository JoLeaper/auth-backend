// const { MongoMemoryServer } = require('mongodb-memory-server');
// const mongod = new MongoMemoryServer();
// const mongoose = require('mongoose');
// const connect = require('../lib/utils/connect');

// const request = require('supertest');
// const app = require('../lib/app');

// describe('card-listing routes', () => {
//   beforeAll(async() => {
//     const uri = await mongod.getUri();
//     return connect(uri);
//   });

//   beforeEach(() => {
//     return mongoose.connection.dropDatabase();
//   });

//   afterAll(async() => {
//     await mongoose.connection.close();
//     return mongod.stop();
//   });

//   // it('creates a new card listing with post', async() => {
//   //   const captainMorgan = await Product.create({
//   //     name: 'Captain Morgan Spiced Rum',
//   //     description: 'US Virgin Islands- Mixes aromas of marshmallow, light toffee and light spiced honey, leading into a molasses-centric flavor. Ideal for spicing up tropical cocktails or mixed with cola.',
//   //     salePricePerMl: 0.02,
//   //     purchasePricePerBottle: 14.99,
//   //     size: 750
//   //   });
//   //   return request(app)
//   //     .post('/api/v1/bottles')
//   //     .send({
//   //       product: captainMorgan._id
//   //     })
//   //     .then(res => {
//   //       expect(res.body).toEqual({
//   //         _id: expect.anything(),
//   //         product: captainMorgan._id.toString(),
//   //         remainingLiquid: captainMorgan.size,
//   //         purchaseDate: expect.any(String),
//   //         lastPourDate: expect.any(String),
//   //         __v: 0
//   //       });
//   //     });
//   // });
// });
