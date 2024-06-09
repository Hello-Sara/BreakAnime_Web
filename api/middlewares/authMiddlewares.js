const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/userModel');

const checkToken = (token) => {
  return jwt.verify(token, config.secret, (err, user) => {
    return err ? undefined : user;
  });
}

const authenticateToken = async (req, res, next) => {
  const decodedUser = checkToken(req.header('Authorization'));
  if(!decodedUser) {
    return res.status(401).json({ error: 'Unauthorized' });
  } 
  req.user = await User.findByPk(decodedUser.userId);
  next();
};


const isAdmin = async (req, res, next) => { 
  const decodedUser = checkToken(req.header('Authorization'));
  if (!decodedUser) {
    return res.status(401).json({ error: 'Not connected' });
  }

  req.user = await User.findByPk(decodedUser.userId);
  if(req.user && req.user.role < 1) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};


const isIdRelatedToUser = (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

const isAdminOrIdRelatedToUser = async (req, res, next) => {
  const decodedUser = checkToken(req.header('Authorization'));
  if (!decodedUser) {
    return res.status(401).json({ error: 'Not connected' });
  }
  req.user = await User.findByPk(decodedUser.userId);
  if(!req.user) {
    return res.status(404).json({ error: 'User does not exist' });
  }

  if (req.user && (req.user.id != req.params.id) && (req.user.role < 1)) {
    return res.status(403).json({ error: 'Forbidden' });
  } 
  
  next(); 
}

module.exports = {
  authenticateToken, isAdmin, isIdRelatedToUser, isAdminOrIdRelatedToUser
};
