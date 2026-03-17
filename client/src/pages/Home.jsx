import React, { useState } from 'react'
import FilterBar    from '../components/FilterBar'
import IdeaCard     from '../components/IdeaCard'
import useIdeas     from '../hooks/useIdeas'
import useRandomIdea from '../hooks/useRandomIdea'
import useAIIdea    from '../hooks/useAIIdea'

function Home() {
  const [filters, setFilters] = useState({
    difficulty: '',
    category: '',
    stack: ''
  })

  // ── Hooks ──
  const { ideas, loading, error }              = useIdeas(filters)
  const { randomIdea, loading: randomLoading,
          fetchRandom, clearRandom }           = useRandomIdea()
  const { aiIdea, loading: aiLoading,
          generateIdea, clearAI }              = useAIIdea()

  // Only one "special" mode active at a time
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    clearRandom()
    clearAI()
  }

  const handleRandom = () => {
    clearAI()
    fetchRandom(filters)
  }

  const handleGenerate = () => {
    clearRandom()
    generateIdea(filters)
  }

  // Decide what to show
  const isLoading    = loading || randomLoading || aiLoading
  const activeIdea   = aiIdea || randomIdea
  const ideasToShow  = activeIdea ? [activeIdea] : ideas

  const resultLabel = aiIdea
    ? '✨ AI Generated Idea'
    : randomIdea
    ? '🎲 Random pick for you'
    : isLoading
    ? 'Loading...'
    : `${ideasToShow.length} idea${ideasToShow.length !== 1 ? 's' : ''} found`

  return (
    <div style={styles.page}>

      {/* ── Hero Header ── */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logoBadge}>✨ AI Powered</div>
          <h1 style={styles.logo}>💡 DevIdeas</h1>
          <p style={styles.tagline}>
            Discover real-world project ideas tailored to your stack and skill level.
            <br />
            <span style={{ color: 'var(--accent2)' }}>
              Powered by Claude AI — fresh ideas every time.
            </span>
          </p>

          {/* ── Stats Row ── */}
          <div style={styles.statsRow}>
            <div style={styles.stat}>
              <span style={styles.statNum}>{ideas.length}+</span>
              <span style={styles.statLabel}>Curated Ideas</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <span style={styles.statNum}>∞</span>
              <span style={styles.statLabel}>AI Ideas</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <span style={styles.statNum}>6</span>
              <span style={styles.statLabel}>Categories</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main style={styles.main}>

        <FilterBar
          filters={filters}
          setFilters={handleFilterChange}
          onRandom={handleRandom}
          onGenerate={handleGenerate}
          isGenerating={aiLoading}
        />

        {/* ── Results Row ── */}
        <div style={styles.resultsRow}>
          <span style={styles.resultsText}>{resultLabel}</span>
          {activeIdea && (
            <button
              style={styles.clearBtn}
              onClick={() => { clearRandom(); clearAI() }}
            >
              ✕ Show all
            </button>
          )}
        </div>

        {/* ── AI Loading State ── */}
        {aiLoading && (
          <div style={styles.aiLoading}>
            <div style={styles.aiPulse}>✨</div>
            <p style={styles.aiLoadingText}>
              Claude is thinking of a real-world idea for you...
            </p>
          </div>
        )}

        {/* ── Regular Loading ── */}
        {loading && !aiLoading && (
          <div style={styles.center}>
            <div style={styles.spinner} />
            <p style={{ color: 'var(--muted)', marginTop: '16px' }}>
              Fetching ideas...
            </p>
          </div>
        )}

        {/* ── Error State ── */}
        {(error) && !isLoading && (
          <div style={styles.errorBox}>
            <p>⚠️ {error}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '8px' }}>
              Make sure your backend server is running on port 5000.
            </p>
          </div>
        )}

        {/* ── Empty State ── */}
        {!isLoading && !error && ideasToShow.length === 0 && (
          <div style={styles.empty}>
            <p style={{ fontSize: '2.5rem' }}>🔍</p>
            <p style={{ fontWeight: '600' }}>No ideas match your filters</p>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              Try the ✨ Generate with AI button for a custom idea!
            </p>
          </div>
        )}

        {/* ── Ideas Grid ── */}
        {!isLoading && ideasToShow.length > 0 && (
          <div style={styles.grid}>
            {ideasToShow.map(idea => (
              <IdeaCard key={idea._id} idea={idea} />
            ))}
          </div>
        )}

      </main>

      {/* ── Footer ── */}
      <footer style={styles.footer}>
        <p>Built with 💜 using MERN + Claude AI</p>
      </footer>

    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'var(--bg)',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    borderBottom: '1px solid var(--border)',
    padding: '48px 24px 40px',
    background: 'var(--surface)',
    textAlign: 'center'
  },
  headerInner: {
    maxWidth: '700px',
    margin: '0 auto'
  },
  logoBadge: {
    display: 'inline-block',
    background: 'var(--accent)22',
    color: 'var(--accent)',
    border: '1px solid var(--accent)44',
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '4px 14px',
    marginBottom: '16px',
    letterSpacing: '0.05em'
  },
  logo: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '12px',
    background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  tagline: {
    color: 'var(--muted)',
    fontSize: '1rem',
    lineHeight: '1.8',
    marginBottom: '32px'
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '24px'
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px'
  },
  statNum: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: 'var(--text)'
  },
  statLabel: {
    fontSize: '0.75rem',
    color: 'var(--muted)',
    fontWeight: '500'
  },
  statDivider: {
    width: '1px',
    height: '32px',
    background: 'var(--border)'
  },
  main: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '32px 24px',
    flex: 1,
    width: '100%'
  },
  resultsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px'
  },
  resultsText: {
    color: 'var(--muted)',
    fontSize: '0.9rem',
    fontWeight: '500'
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
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '80px 0'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid var(--border)',
    borderTop: '3px solid var(--accent)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  },
  aiLoading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '80px 0',
    gap: '16px'
  },
  aiPulse: {
    fontSize: '3rem',
    animation: 'spin 2s linear infinite'
  },
  aiLoadingText: {
    color: 'var(--muted)',
    fontSize: '1rem'
  },
  errorBox: {
    background: '#ef444422',
    border: '1px solid #ef444444',
    borderRadius: 'var(--radius)',
    padding: '24px',
    color: '#ef4444',
    textAlign: 'center'
  },
  empty: {
    textAlign: 'center',
    padding: '80px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'center',
    color: 'var(--text)'
  },
  footer: {
    textAlign: 'center',
    padding: '24px',
    color: 'var(--muted)',
    fontSize: '0.85rem',
    borderTop: '1px solid var(--border)'
  }
}

export default Home