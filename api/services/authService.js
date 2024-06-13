const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const { Op } = require('sequelize');
const UserNotFoundError = require('../errors/UserNotFoundError');
const InvalidPasswordError = require('../errors/InvalidPasswordError');
const User = require('../models/userModel');

class AuthService {
  async login(email, username, password) {
    const user = await User.findOne({ 
      where: { 
        [Op.or]: [
          { username: username != undefined ? username : null},
          { email: email != undefined ? email : null}
        ] 
      } 
    });
    if (!user) {
      throw new Error('User not found');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, config.secret);

    return {token: token, id: user.id};
  };

  async isTokenExpired(token) {
    const decodedToken = jwt.decode(token);
    if (!decodedToken) {
      throw new Error('Invalid token');
    }
    const currentTime = Date.now();
    const expirationTime = decodedToken.exp * 1000;
    if (expirationTime < currentTime) {
      return true;
    }
    return false;
  };

  async loginAsAdmin(email, password) {
    const admin = await User.findOne({ 
      where: { 
        email: email,
        role: 1
      } 
    });
    if (!admin) {
      throw new UserNotFoundError('Admin not found');
    }

    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      throw new InvalidPasswordError('Invalid password');
    }

    const token = jwt.sign({ userId: admin.id }, config.secret, { expiresIn: '1h' });

    return token;
  };

  async register(name, email, username, password) {
    if (!username || username.trim() === '') {
      throw new Error('Username cannot be empty');
    }

    if (username.length < 4 || username.length > 18) {
      throw new Error('Username must be between 4 and 18 characters');
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      throw new Error('Username already in use');
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({  name, email, username, password: hashedPassword });

      const token = jwt.sign({ userId: user.id }, config.secret );

      return token;
    } catch (error) {
      throw new Error('Registration failed');
    }
  };
}

module.exports = AuthService;