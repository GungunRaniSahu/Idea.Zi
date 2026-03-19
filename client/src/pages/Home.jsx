import React, { useState, useEffect } from 'react'
import FilterBar     from '../components/FilterBar'
import IdeaCard      from '../components/IdeaCard'
import useIdeas      from '../hooks/useIdeas'
import useRandomIdea from '../hooks/useRandomIdea'
import useAIIdea     from '../hooks/useAIIdea'

function Home() {
  const [filters, setFilters] = useState({ difficulty: '', category: '', stack: '' })
  const [darkMode, setDarkMode] = useState(false)

  // Apply dark mode to <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const { ideas, loading, error }                          = useIdeas(filters)
  const { randomIdea, loading: randomLoading, fetchRandom, clearRandom } = useRandomIdea()
  const { aiIdea, loading: aiLoading, generateIdea, clearAI }            = useAIIdea()

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    clearRandom()
    clearAI()
  }

  const handleRandom = () => { clearAI(); fetchRandom(filters) }
  const handleGenerate = () => { clearRandom(); generateIdea(filters) }

  const isLoading   = loading || randomLoading || aiLoading
  const activeIdea  = aiIdea || randomIdea
  const ideasToShow = activeIdea ? [activeIdea] : ideas

  const resultLabel = aiIdea
    ? '✨ AI Generated Idea'
    : randomIdea
    ? '🎲 Random pick'
    : isLoading
    ? 'Loading...'
    : `${ideasToShow.length} idea${ideasToShow.length !== 1 ? 's' : ''} found`

  return (
    <div style={styles.page}>

      {/* ── Navbar ── */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.navBrand}>
            <span style={styles.navLogo}>💡</span>
            <span style={styles.navName}>Idea.Zi — Find Your Next Dev Project</span>
          </div>
          <div style={styles.navRight}>
            <span style={styles.navPill}>Free</span>
            <span style={styles.navPill}>AI Powered</span>
            <span style={styles.navPill}>MERN Stack</span>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.heroBadge}>
            <span style={styles.heroBadgeDot} />
            Powered by Groq + Llama 3
          </div>
          <h1 style={styles.heroTitle}>
            Find Your Next<br />
            <span style={styles.heroAccent}>Dev Project</span>
          </h1>
          <p style={styles.heroSub}>
            Real-world project ideas tailored to your skill level and tech stack.
            <br />Generate unlimited ideas with AI — completely free.
          </p>

          {/* Stats */}
          <div style={styles.statsRow}>
            {[
              { num: ideas.length + '+', label: 'Curated Ideas' },
              { num: '∞',               label: 'AI Ideas'       },
              { num: '4',               label: 'Difficulty Levels' },
              { num: '6',               label: 'Categories'     },
            ].map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={styles.statDivider} />}
                <div style={styles.stat}>
                  <span style={styles.statNum}>{s.num}</span>
                  <span style={styles.statLabel}>{s.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main style={styles.main}>

        <FilterBar
          filters={filters}
          setFilters={handleFilterChange}
          onRandom={handleRandom}
          onGenerate={handleGenerate}
          isGenerating={aiLoading}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Results Row */}
        <div style={styles.resultsRow}>
          <span style={styles.resultsText}>{resultLabel}</span>
          {activeIdea && (
            <button
              style={styles.showAllBtn}
              onClick={() => { clearRandom(); clearAI() }}
            >
              ← Show all ideas
            </button>
          )}
        </div>

        {/* AI Loading */}
        {aiLoading && (
          <div style={styles.aiLoadingBox}>
            <div style={styles.aiLoadingIcon}>✨</div>
            <div>
              <p style={styles.aiLoadingTitle}>Generating your idea...</p>
              <p style={styles.aiLoadingSubtitle}>Llama 3 is thinking of a real-world problem to solve</p>
            </div>
          </div>
        )}

        {/* Regular Loading */}
        {loading && !aiLoading && (
          <div style={styles.center}>
            <div style={styles.spinner} />
            <p style={styles.loadingText}>Fetching ideas...</p>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div style={styles.errorBox}>
            <p style={styles.errorTitle}>⚠️ Could not connect to server</p>
            <p style={styles.errorSub}>Make sure your backend is running on port 5000.</p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && ideasToShow.length === 0 && (
          <div style={styles.emptyBox}>
            <p style={styles.emptyIcon}>🔍</p>
            <p style={styles.emptyTitle}>No ideas match your filters</p>
            <p style={styles.emptySub}>Try the ✨ Generate with AI button for a custom idea!</p>
          </div>
        )}

        {/* Ideas Grid */}
        {!isLoading && ideasToShow.length > 0 && (
          <div style={styles.grid}>
            {ideasToShow.map((idea, i) => (
              <div
                key={idea._id}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <IdeaCard idea={idea} isAI={!!aiIdea} />
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <span>Idea.Zi — Find Your Next Dev Project</span>
          <span style={styles.footerDot}>·</span>
          <span>Built with MERN + Groq AI</span>
          <span style={styles.footerDot}>·</span>
          <span>Free & Open Source</span>
        </div>
      </footer>

    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'var(--background)',
    display: 'flex',
    flexDirection: 'column'
  },

  // Nav
  nav: {
    borderBottom: '1px solid var(--border)',
    background: 'var(--card)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  navInner: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px'
  },
  navBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  navLogo: { fontSize: '1.3rem' },
  navName: {
    fontSize: '1rem',
    fontWeight: '800',
    color: 'var(--foreground)',
    letterSpacing: '-0.01em'
  },
  navRight: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap'
  },
  navPill: {
    background: 'var(--secondary)',
    color: 'var(--secondary-foreground)',
    fontSize: '0.7rem',
    fontWeight: '600',
    padding: '3px 10px',
    borderRadius: '999px',
    border: '1px solid var(--border)'
  },

  // Hero
  hero: {
    borderBottom: '1px solid var(--border)',
    background: 'var(--card)',
    padding: '56px 24px 48px'
  },
  heroInner: {
    maxWidth: '680px',
    margin: '0 auto',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px'
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    background: 'var(--secondary)',
    color: 'var(--secondary-foreground)',
    border: '1px solid var(--border)',
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '5px 14px'
  },
  heroBadgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--beginner)',
    animation: 'pulse 2s ease infinite'
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: '800',
    lineHeight: '1.15',
    letterSpacing: '-0.02em',
    color: 'var(--foreground)'
  },
  heroAccent: {
    color: 'var(--primary)'
  },
  heroSub: {
    color: 'var(--muted-foreground)',
    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
    lineHeight: '1.8',
    maxWidth: '520px'
  },
  statsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '8px'
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px'
  },
  statNum: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: 'var(--foreground)',
    fontFamily: 'var(--font-mono)'
  },
  statLabel: {
    fontSize: '0.7rem',
    color: 'var(--muted-foreground)',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.06em'
  },
  statDivider: {
    width: '1px',
    height: '28px',
    background: 'var(--border)'
  },

  // Main
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
    justifyContent: 'space-between',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '8px'
  },
  resultsText: {
    color: 'var(--muted-foreground)',
    fontSize: '0.85rem',
    fontWeight: '600'
  },
  showAllBtn: {
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--muted-foreground)',
    fontSize: '0.8rem',
    fontWeight: '600',
    padding: '5px 12px',
    fontFamily: 'var(--font-sans)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px'
  },

  // States
  aiLoadingBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: 'var(--secondary)',
    border: '1px solid var(--border)',
    borderRadius: 'calc(var(--radius) * 2)',
    padding: '24px 28px'
  },
  aiLoadingIcon: {
    fontSize: '2rem',
    animation: 'spin 2s linear infinite',
    flexShrink: 0
  },
  aiLoadingTitle: {
    fontWeight: '700',
    fontSize: '0.95rem',
    color: 'var(--foreground)',
    marginBottom: '4px'
  },
  aiLoadingSubtitle: {
    fontSize: '0.82rem',
    color: 'var(--muted-foreground)'
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '80px 0',
    gap: '16px'
  },
  spinner: {
    width: '36px',
    height: '36px',
    border: '3px solid var(--border)',
    borderTop: '3px solid var(--primary)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  },
  loadingText: {
    color: 'var(--muted-foreground)',
    fontSize: '0.9rem'
  },
  errorBox: {
    background: 'oklch(0.6271 0.1936 33.3390 / 0.08)',
    border: '1px solid oklch(0.6271 0.1936 33.3390 / 0.3)',
    borderRadius: 'calc(var(--radius) * 2)',
    padding: '24px',
    textAlign: 'center'
  },
  errorTitle: {
    color: 'var(--destructive)',
    fontWeight: '700',
    marginBottom: '6px'
  },
  errorSub: {
    color: 'var(--muted-foreground)',
    fontSize: '0.85rem'
  },
  emptyBox: {
    textAlign: 'center',
    padding: '80px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'center'
  },
  emptyIcon: { fontSize: '2.5rem' },
  emptyTitle: {
    fontWeight: '700',
    fontSize: '1rem',
    color: 'var(--foreground)'
  },
  emptySub: {
    color: 'var(--muted-foreground)',
    fontSize: '0.85rem'
  },

  // Footer
  footer: {
    borderTop: '1px solid var(--border)',
    padding: '20px 24px',
    background: 'var(--card)'
  },
  footerInner: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '0.8rem',
    color: 'var(--muted-foreground)',
    fontWeight: '500',
    flexWrap: 'wrap'
  },
  footerDot: {
    opacity: 0.4
  }
}

export default Home