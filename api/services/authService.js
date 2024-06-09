const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const config = require('../config/config');
const { Op } = require('sequelize');
const UserNotFoundError = require('../errors/UserNotFoundError');
const InvalidPasswordError = require('../errors/InvalidPasswordError');


const login = async (email, username, password) => {
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

  return token;
};

const loginAsAdmin = async (email, password) => {
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

const register = async (name, email, username, password) => {
  if (!username || username.trim() === '') {
    throw new Error('Username cannot be empty');
  }

  if (username.length < 4 || username.length > 8) {
    throw new Error('Username must be between 4 and 8 characters');
  }

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    throw new Error('Username already in use');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({  name, email, username, password: hashedPassword });

    const token = jwt.sign({ userId: user.id }, config.secret, { expiresIn: '1h' });

    return token;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

  module.exports = {
    login,
    register, 
    loginAsAdmin
  };