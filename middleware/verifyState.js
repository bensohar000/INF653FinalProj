const statesData = require('../statesData.json');

const verifyState = (req, res, next) => {
  const code = req.params.state.toUpperCase();
  const state = statesData.find(s => s.code === code);
  if (!state) {
    return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
  }
  req.state = state;
  next();
};

module.exports = verifyState;