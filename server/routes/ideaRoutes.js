const express = require('express')
const router  = express.Router()
const { getIdeas, getRandomIdea }  = require('../controllers/ideaController')
const { generateAIIdea }           = require('../controllers/aiController')

// GET /api/ideas           → all ideas with filters
router.get('/',        getIdeas)

// GET /api/ideas/random    → one random idea from DB
router.get('/random',  getRandomIdea)

// GET /api/ideas/ai        → one AI generated idea
router.get('/ai',      generateAIIdea)

module.exports = router
