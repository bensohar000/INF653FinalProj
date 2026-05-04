const statesData = require('../statesData.json');
const State = require('../model/States');

// ── Helper ──────────────────────────────────────────────
const mergeState = async (state) => {
  const mongoState = await State.findOne({ stateCode: state.code });
  if (mongoState?.funfacts?.length > 0) {
    return { ...state, funfacts: mongoState.funfacts };
  }
  return state;
};

// ── GET /states/ ────────────────────────────────────────
const getAllStates = async (req, res) => {
  let states = [...statesData];

  if (req.query.contig === 'true') {
    states = states.filter(s => s.code !== 'AK' && s.code !== 'HI');
  } else if (req.query.contig === 'false') {
    states = states.filter(s => s.code === 'AK' || s.code === 'HI');
  }

  const merged = await Promise.all(states.map(mergeState));
  res.json(merged);
};

// ── GET /states/:state ──────────────────────────────────
const getState = async (req, res) => {
  const merged = await mergeState(req.state);
  res.json(merged);
};

// ── GET /states/:state/funfact ──────────────────────────
const getFunFact = async (req, res) => {
  const mongoState = await State.findOne({ stateCode: req.state.code });
  if (!mongoState?.funfacts?.length) {
    return res.status(404).json({ message: `No Fun Facts found for ${req.state.state}` });
  }
  const random = mongoState.funfacts[
    Math.floor(Math.random() * mongoState.funfacts.length)
  ];
  res.json({ funfact: random });
};

// ── GET /states/:state/capital ──────────────────────────
const getCapital = (req, res) => {
  res.json({
    state: req.state.state,
    capital: req.state.capital_city
  });
};

// ── GET /states/:state/nickname ─────────────────────────
const getNickname = (req, res) => {
  res.json({
    state: req.state.state,
    nickname: req.state.nickname
  });
};

// ── GET /states/:state/population ──────────────────────
const getPopulation = (req, res) => {
  res.json({
    state: req.state.state,
    population: req.state.population.toLocaleString('en-US')
  });
};

// ── GET /states/:state/admission ────────────────────────
const getAdmission = (req, res) => {
  res.json({
    state: req.state.state,
    admitted: req.state.admission_date
  });
};

// ── POST /states/:state/funfact ─────────────────────────
const addFunFact = async (req, res) => {
  if (!req.body.funfacts) {
    return res.status(400).json({ message: 'State fun facts value required' });
  }
  if (!Array.isArray(req.body.funfacts)) {
    return res.status(400).json({ message: 'State fun facts value must be an array' });
  }

  let mongoState = await State.findOne({ stateCode: req.state.code });

  if (mongoState) {
    mongoState.funfacts = [...mongoState.funfacts, ...req.body.funfacts];
    const result = await mongoState.save();
    return res.json(result);
  }

  const result = await State.create({
    stateCode: req.state.code,
    funfacts: req.body.funfacts
  });
  res.json(result);
};

// ── PATCH /states/:state/funfact ────────────────────────
const updateFunFact = async (req, res) => {
  if (!req.body.index) {
    return res.status(400).json({ message: 'State fun fact index value required' });
  }
  if (!req.body.funfact) {
    return res.status(400).json({ message: 'State fun fact value required' });
  }

  const mongoState = await State.findOne({ stateCode: req.state.code });
  if (!mongoState?.funfacts?.length) {
    return res.status(404).json({ message: `No Fun Facts found for ${req.state.state}` });
  }

  const idx = req.body.index - 1;
  if (idx < 0 || idx >= mongoState.funfacts.length) {
    return res.status(404).json({ message: `No Fun Fact found at that index for ${req.state.state}` });
  }

  mongoState.funfacts[idx] = req.body.funfact;
  const result = await mongoState.save();
  res.json(result);
};

// ── DELETE /states/:state/funfact ───────────────────────
const deleteFunFact = async (req, res) => {
  if (!req.body.index) {
    return res.status(400).json({ message: 'State fun fact index value required' });
  }

  const mongoState = await State.findOne({ stateCode: req.state.code });
  if (!mongoState?.funfacts?.length) {
    return res.status(404).json({ message: `No Fun Facts found for ${req.state.state}` });
  }

  const idx = req.body.index - 1;
  if (idx < 0 || idx >= mongoState.funfacts.length) {
    return res.status(404).json({ message: `No Fun Fact found at that index for ${req.state.state}` });
  }

  mongoState.funfacts.splice(idx, 1);
  const result = await mongoState.save();
  res.json(result);
};

module.exports = {
  getAllStates,
  getState,
  getFunFact,
  getCapital,
  getNickname,
  getPopulation,
  getAdmission,
  addFunFact,
  updateFunFact,
  deleteFunFact
};