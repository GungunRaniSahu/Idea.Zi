const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  stack: {
    type: [String],   // Array of strings e.g. ['React', 'Node']
    required: true
  },
  category: {
    type: String,
    enum: ['Web', 'AI', 'Mobile', 'Game', 'CLI', 'API'],
    required: true
  },
  features: {
    type: [String],   // List of features
    required: true
  },
  bonusChallenges: {
    type: [String],   // List of bonus challenges
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Idea', ideaSchema);