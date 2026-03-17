const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Idea = require('../models/Idea');
const ideas = require('./seedIdeas');

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Clear existing data first
    await Idea.deleteMany({});
    console.log('🗑️  Old ideas deleted');

    // Insert fresh seed data
    await Idea.insertMany(ideas);
    console.log('🌱 Ideas seeded successfully!');

    process.exit(0); // Exit after seeding
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDB();