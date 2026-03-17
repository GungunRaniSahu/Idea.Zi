const Idea = require('../models/Idea');

// GET all ideas (with optional filters)
const getIdeas = async (req, res) => {
  try {
    const { difficulty, category, stack } = req.query;

    // Build filter object dynamically
    let filter = {};

    if (difficulty) filter.difficulty = difficulty;
    if (category) filter.category = category;
    if (stack) filter.stack = { $in: [stack] }; // matches if array contains value

    const ideas = await Idea.find(filter);
    res.json(ideas);

  } catch (error) {
    res.status(500).json({ message: '❌ Server error', error });
  }
};

// GET one random idea
const getRandomIdea = async (req, res) => {
  try {
    const { difficulty, category } = req.query;
    let filter = {};

    if (difficulty) filter.difficulty = difficulty;
    if (category) filter.category = category;

    const count = await Idea.countDocuments(filter);

    if (count === 0) {
      return res.status(404).json({ message: 'No ideas found for these filters' });
    }

    // Pick a random number between 0 and total count
    const randomIndex = Math.floor(Math.random() * count);
    const randomIdea = await Idea.findOne(filter).skip(randomIndex);

    res.json(randomIdea);

  } catch (error) {
    res.status(500).json({ message: '❌ Server error', error });
  }
};

module.exports = { getIdeas, getRandomIdea };