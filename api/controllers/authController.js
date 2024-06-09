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

const register = async (req, res) => {
  const user = req.body;
  console.log(user);
  try {
    const token = await authService.register(user.name, user.email, user.username, user.password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  register
};
