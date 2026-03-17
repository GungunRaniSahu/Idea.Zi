const Groq = require('groq-sdk')

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

const generateAIIdea = async (req, res) => {
  try {
    const { difficulty, category, stack } = req.query

    // Build filter text
    const filters = []
    if (difficulty) filters.push(`Difficulty: ${difficulty}`)
    if (category)   filters.push(`Category: ${category}`)
    if (stack)      filters.push(`Tech Stack: ${stack}`)

    const filterText = filters.length > 0
      ? `Use these filters:\n${filters.join('\n')}`
      : 'Choose any difficulty, category and stack.'

      const prompt = `You are a senior software engineer mentor. Generate ONE unique, real-world software project idea for a developer to build. Be creative and unpredictable — every idea must be completely different from common ones like todo apps, weather apps, or chat apps. Think of niche, specific, real problems people face.

      Random seed for variety: ${Math.random()}

${filterText}

The idea must solve a real problem that people actually face in daily life, work, or society.

Respond ONLY with a valid JSON object in exactly this format (no extra text, no markdown, no backticks):
{
  "title": "Project title here",
  "description": "2-3 sentence description of what it does and what problem it solves",
  "difficulty": "Beginner",
  "stack": ["tech1", "tech2", "tech3"],
  "category": "Web",
  "features": [
    "Feature one",
    "Feature two",
    "Feature three",
    "Feature four"
  ],
  "bonusChallenges": [
    "Bonus challenge one",
    "Bonus challenge two",
    "Bonus challenge three"
  ]
}

Rules:
- difficulty must be exactly one of: Beginner, Intermediate, Advanced
- category must be exactly one of: Web, AI, Mobile, Game, CLI, API
- Return ONLY the JSON, nothing else`

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',   // Free and fast Groq model
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that responds only with valid JSON. Never include markdown, backticks, or extra text.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 1.0,    // Maximum creativity
max_tokens: 1024,
seed: Math.floor(Math.random() * 1000000)  // Different seed every time
    })

    // Get the response text
    const rawText = completion.choices[0].message.content.trim()

    // Clean up in case model adds backticks anyway
    const cleanText = rawText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    // Parse JSON
    const idea = JSON.parse(cleanText)

    // Add temporary id
    idea._id = 'ai-' + Date.now()

    res.json(idea)

  } catch (error) {
    console.error('Groq AI error:', error.message)
    res.status(500).json({
      message: 'Failed to generate idea',
      error: error.message
    })
  }
}

module.exports = { generateAIIdea }