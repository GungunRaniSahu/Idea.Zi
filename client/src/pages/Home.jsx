import React, { useState } from 'react'
import FilterBar from '../components/FilterBar'
import IdeaCard from '../components/IdeaCard'

// ── Temporary hard-coded ideas for now ──
// We'll replace this with real API data in Phase 4
const TEMP_IDEAS = [
  {
    _id: '1',
    title: 'Personal Finance Tracker',
    description: 'A web app to track your income, expenses, and savings goals with visual charts.',
    difficulty: 'Beginner',
    stack: ['React', 'Node', 'Express', 'MongoDB'],
    category: 'Web',
    features: ['Add income and expense entries', 'View monthly summary', 'Simple pie chart', 'Delete or edit entries'],
    bonusChallenges: ['Add user authentication', 'Export data as CSV', 'Set monthly budget limits']
  },
  {
    _id: '2',
    title: 'AI Recipe Generator',
    description: 'Enter ingredients you have and get AI-powered recipe suggestions.',
    difficulty: 'Intermediate',
    stack: ['React', 'Node', 'Express', 'OpenAI API'],
    category: 'AI',
    features: ['Input multiple ingredients', 'Fetch recipe from OpenAI', 'Display recipe with steps', 'Save favourites'],
    bonusChallenges: ['Add dietary filter', 'Generate a shopping list', 'Rate and review recipes']
  },
  {
    _id: '3',
    title: 'Multiplayer Quiz Game',
    description: 'A real-time quiz game where players compete in live rooms.',
    difficulty: 'Advanced',
    stack: ['React', 'Node', 'Express', 'Socket.io'],
    category: 'Game',
    features: ['Create and join rooms', 'Real-time score updates', 'Timer per question', 'Leaderboard'],
    bonusChallenges: ['Custom question sets', 'Voice countdown', 'Spectator mode']
  }
]

function Home() {
  const [filters, setFilters]         = useState({})
  const [randomIdea, setRandomIdea]   = useState(null)

  // Filter ideas based on selected filters
  const filteredIdeas = TEMP_IDEAS.filter(idea => {
    if (filters.difficulty && idea.difficulty !== filters.difficulty) return false
    if (filters.category   && idea.category   !== filters.category)   return false
    if (filters.stack      && !idea.stack.includes(filters.stack))    return false
    return true
  })

  // Pick a random idea from filtered list
  const handleRandom = () => {
    const pool = filteredIdeas.length > 0 ? filteredIdeas : TEMP_IDEAS
    const pick = pool[Math.floor(Math.random() * pool.length)]
    setRandomIdea(pick)
  }

  // Which ideas to show
  const ideasToShow = randomIdea ? [randomIdea] : filteredIdeas

  return (
    <div style={styles.page}>

      {/* ── Header ── */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>💡 DevIdeas</div>
          <p style={styles.tagline}>
            Find your next project. Filter by stack, difficulty, and category.
          </p>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main style={styles.main}>

        <FilterBar
          filters={filters}
          setFilters={(val) => { setFilters(val); setRandomIdea(null) }}
          onRandom={handleRandom}
        />

        {/* ── Results Info ── */}
        <div style={styles.resultsRow}>
          <span style={styles.resultsText}>
            {randomIdea
              ? '🎲 Random pick for you'
              : `${ideasToShow.length} idea${ideasToShow.length !== 1 ? 's' : ''} found`
            }
          </span>
          {randomIdea && (
            <button
              style={styles.clearBtn}
              onClick={() => setRandomIdea(null)}
            >
              ✕ Show all
            </button>
          )}
        </div>

        {/* ── Cards Grid ── */}
        {ideasToShow.length === 0 ? (
          <div style={styles.empty}>
            <p>😕 No ideas match your filters.</p>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              Try changing or clearing the filters.
            </p>
          </div>
        ) : (
          <div style={styles.grid}>
            {ideasToShow.map(idea => (
              <IdeaCard key={idea._id} idea={idea} />
            ))}
          </div>
        )}

      </main>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'var(--bg)'
  },
  header: {
    borderBottom: '1px solid var(--border)',
    padding: '40px 24px 32px',
    background: 'var(--surface)'
  },
  headerInner: {
    maxWidth: '1100px',
    margin: '0 auto'
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: '800',
    marginBottom: '8px',
    background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  tagline: {
    color: 'var(--muted)',
    fontSize: '1rem'
  },
  main: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '32px 24px'
  },
  resultsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px'
  },
  resultsText: {
    color: 'var(--muted)',
    fontSize: '0.9rem'
  },
  clearBtn: {
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    color: 'var(--muted)',
    fontSize: '0.8rem',
    padding: '4px 10px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '24px'
  },
  empty: {
    textAlign: 'center',
    padding: '80px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'center',
    color: 'var(--text)'
  }
}

export default Home