const AuthService = require('../services/authService');
const authService = new AuthService();

exports.login = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const token = await authService.login(email, username, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err });
  }
};


exports.verifyToken = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const isTokenExpired = await authService.isTokenExpired(token);
    if(isTokenExpired) {
      return res.status(200).json({ expired: true });
    } else {
      return res.status(200).json({ expired: false });
    }
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.loginAsAdmin(email, password);
    res.json({ token });
  } catch (err) {
    if(err.name === 'UserNotFoundError') {
      return res.status(404).json({ error: err.message });
    } else if(err.name === 'InvalidPasswordError') {
      return res.status(401).json({ error: err.message });
    } else {
      return res.status(500).json({ error: err.message });
    }
  }
};

exports.register = async (req, res) => {
  const user = req.body;
  if(user.password.length < 10) {
    return res.status(400).json({ error: 'Password must be at least 10 characters' });
  }
  try {
    const token = await authService.register(user.name, user.email, user.username, user.password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};