require('dotenv').config();

const User = require('./User');

describe('User model', () => {
  it('sets a password hash', () => {
    const user = new User({
      email: 'test@test.com',
      password: 'test1234',
      profileImage: 'http://image.com/image.png'
    });

    expect(user.passwordHash).toEqual(expect.any(String));
  });

  it('has an authToken method', () => {
    const user = new User({
      email: 'test@test.com',
      password: 'test1234',
      profileImage: 'http://image.com/image.png'
    });

    expect(user.authToken()).toEqual(expect.any(String));
  });

  it('can verify a token and return a user', () => {
    const user = new User({
      email: 'test@test.com',
      password: 'test1234',
      profileImage: 'http://image.com/image.png'
    });

    const token = user.authToken();
    const verifiedUser = User.verifyToken(token);

    expect(verifiedUser.toJSON()).toEqual(user.toJSON());
  });
});
