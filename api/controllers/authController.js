const authService = require('../services/authService');

const login = async (req, res) => {
  const { email, username, password } = req.body;
  console.log(req.body);
  try {
    const token = await authService.login(email, username, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.loginAsAdmin(email, password);
    res.json({ token });
  } catch (err) {
    if(err.name === 'NotFound') {
      return res.status(404).json({ error: err.message });
    } else if(err.name === 'InvalidPassword') {
      return res.status(401).json({ error: err.message });
    } else {
      return res.status(500).json({ error: err.message });
    }
  }
};

const register = async (req, res) => {
  const user = req.body;
  if(user.password.length < 6 || user.password.length > 16) {
    return res.status(400).json({ error: 'Password must be between 6 and 16 characters' });
  }
  try {
    const token = await authService.register(user.name, user.email, user.username, user.password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
  adminLogin
};
