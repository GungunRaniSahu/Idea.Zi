import React, { useState, useEffect } from 'react'
import FilterBar     from '../components/FilterBar'
import IdeaCard      from '../components/IdeaCard'
import useIdeas      from '../hooks/useIdeas'
import useRandomIdea from '../hooks/useRandomIdea'
import useAIIdea     from '../hooks/useAIIdea'

function Home() {
  const [filters, setFilters]         = useState({ difficulty: '', category: '', stack: '' })
  const [darkMode, setDarkMode]       = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [isMobile, setIsMobile]       = useState(window.innerWidth <= 640)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 640)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const { ideas, loading, error }                                         = useIdeas(filters)
  const { randomIdea, loading: randomLoading, fetchRandom, clearRandom } = useRandomIdea()
  const { aiIdea, loading: aiLoading, generateIdea, clearAI }            = useAIIdea()

  const handleFilterChange = (f) => { setFilters(f); clearRandom(); clearAI() }
  const handleRandom       = () => { clearAI();     fetchRandom(filters) }
  const handleGenerate     = () => { clearRandom(); generateIdea(filters) }

  const isLoading    = loading || randomLoading || aiLoading
  const activeIdea   = aiIdea || randomIdea
  const ideasToShow  = activeIdea ? [activeIdea] : ideas
  const filterCount  = [filters.difficulty, filters.category, filters.stack].filter(Boolean).length

  const resultLabel = aiIdea     ? '✨ AI Generated'
    : randomIdea                 ? '🎲 Random pick'
    : isLoading                  ? 'Loading...'
    : `${ideasToShow.length} idea${ideasToShow.length !== 1 ? 's' : ''}`

  return (
    <div style={styles.page}>

      {/* ── Navbar ── */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.navBrand}>
            <span>💡</span>
            <span style={styles.navName}>Idea.Zi</span>
          </div>
          <div style={styles.navRight}>
            {!isMobile && (
              <>
                <span style={styles.navPill}>Free</span>
                <span style={styles.navPill}>AI Powered</span>
                <span style={styles.navPill}>MERN</span>
              </>
            )}
            <button onClick={() => setDarkMode(!darkMode)} style={styles.themeBtn}>
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header style={isMobile ? styles.heroMobile : styles.hero}>
        <div style={styles.heroInner}>

          <div style={styles.heroBadge}>
            <span style={styles.heroBadgeDot} />
            Groq + Llama 3.3
          </div>

          <h1 style={isMobile ? styles.heroTitleMobile : styles.heroTitle}>
            Your Next Big Idea<br />
            <span style={styles.heroAccent}>Starts Here</span>
          </h1>

          {!isMobile && (
            <p style={styles.heroSub}>
              Real-world project ideas tailored to your skill level and stack.
              Generate unlimited ideas with AI — completely free.
            </p>
          )}

          <div style={isMobile ? styles.statsMobile : styles.statsRow}>
            {[
              { num: ideas.length + '+', label: 'Ideas'     },
              { num: '∞',               label: 'AI Ideas'   },
              { num: '6',               label: 'Categories' },
            ].map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={styles.statDivider} />}
                <div style={styles.stat}>
                  <span style={isMobile ? styles.statNumSm : styles.statNum}>{s.num}</span>
                  <span style={styles.statLabel}>{s.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>

        </div>
      </header>

      {/* ── Main ── */}
      <main style={{ ...styles.main, paddingBottom: isMobile ? '96px' : '40px' }}>

        {/* Desktop FilterBar */}
        {!isMobile && (
          <FilterBar
            filters={filters}
            setFilters={handleFilterChange}
            onRandom={handleRandom}
            onGenerate={handleGenerate}
            isGenerating={aiLoading}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        )}

        {/* Mobile filter sheet */}
        {isMobile && showFilters && (
          <div style={styles.filterSheet}>
            <div style={styles.filterSheetHeader}>
              <span style={styles.filterSheetTitle}>🎯 Filters</span>
              <button style={styles.closeBtn} onClick={() => setShowFilters(false)}>✕</button>
            </div>
            <FilterBar
              filters={filters}
              setFilters={(f) => { handleFilterChange(f); setShowFilters(false) }}
              onRandom={() => { handleRandom(); setShowFilters(false) }}
              onGenerate={() => { handleGenerate(); setShowFilters(false) }}
              isGenerating={aiLoading}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              isMobile={true}
            />
          </div>
        )}

        {/* Results row */}
        <div style={styles.resultsRow}>
          <span style={styles.resultsText}>{resultLabel}</span>
          {activeIdea && (
            <button style={styles.showAllBtn} onClick={() => { clearRandom(); clearAI() }}>
              ← Show all
            </button>
          )}
        </div>

        {/* AI Loading */}
        {aiLoading && (
          <div style={styles.aiLoadingBox}>
            <span style={styles.aiLoadingIcon}>✨</span>
            <div>
              <p style={styles.aiLoadingTitle}>Generating idea...</p>
              <p style={styles.aiLoadingSubtitle}>Llama 3.3 is thinking of a real-world problem</p>
            </div>
          </div>
        )}

        {/* Spinner */}
        {loading && !aiLoading && (
          <div style={styles.center}>
            <div style={styles.spinner} />
            <p style={styles.loadingText}>Fetching ideas...</p>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div style={styles.errorBox}>
            <p style={styles.errorTitle}>⚠️ Server not reachable</p>
            <p style={styles.errorSub}>Make sure backend runs on port 5000.</p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && ideasToShow.length === 0 && (
          <div style={styles.emptyBox}>
            <p style={{ fontSize: '2rem' }}>🔍</p>
            <p style={styles.emptyTitle}>No ideas found</p>
            <p style={styles.emptySub}>Try AI generation or clear your filters</p>
          </div>
        )}

        {/* Cards */}
        {!isLoading && ideasToShow.length > 0 && (
          <div style={isMobile ? styles.gridMobile : styles.grid}>
            {ideasToShow.map((idea, i) => (
              <div key={idea._id} style={{ animationDelay: `${i * 0.07}s` }}>
                <IdeaCard idea={idea} isAI={!!aiIdea} isMobile={isMobile} />
              </div>
            ))}
          </div>
        )}

      </main>

      {/* ── Bottom Nav (mobile only) ── */}
      {isMobile && (
        <div style={styles.bottomNav}>

          <button style={styles.bottomBtn} onClick={() => setShowFilters(!showFilters)}>
            <span style={styles.bottomIcon}>⚙️</span>
            <span style={styles.bottomLabel}>
              Filters{filterCount > 0 ? ` (${filterCount})` : ''}
            </span>
          </button>

          <button style={styles.bottomBtn} onClick={handleRandom}>
            <span style={styles.bottomIcon}>🎲</span>
            <span style={styles.bottomLabel}>Random</span>
          </button>

          <button
            style={{ ...styles.bottomBtnPrimary, opacity: aiLoading ? 0.7 : 1 }}
            onClick={handleGenerate}
            disabled={aiLoading}
          >
            <span style={styles.bottomIcon}>✨</span>
            <span style={{ ...styles.bottomLabel, color: 'var(--primary-foreground)' }}>
              {aiLoading ? 'Thinking...' : 'AI Idea'}
            </span>
          </button>

          <button style={styles.bottomBtn} onClick={() => setDarkMode(!darkMode)}>
            <span style={styles.bottomIcon}>{darkMode ? '☀️' : '🌙'}</span>
            <span style={styles.bottomLabel}>Theme</span>
          </button>

        </div>
      )}

      {/* Footer — desktop only */}
      {!isMobile && (
        <footer style={styles.footer}>
          <div style={styles.footerInner}>
            <span>💡 Idea.Zi</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Built with MERN + Groq AI</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Free & Open Source</span>
          </div>
        </footer>
      )}

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

  /* Navbar */
  nav: {
    borderBottom: '1px solid var(--border)',
    background: 'var(--card)',
    position: 'sticky',
    top: 0,
    zIndex: 200
  },
  navInner: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  navBrand: { display: 'flex', alignItems: 'center', gap: '7px' },
  navName: {
    fontSize: '1rem',
    fontWeight: '800',
    color: 'var(--foreground)',
    letterSpacing: '-0.02em'
  },
  navRight: { display: 'flex', alignItems: 'center', gap: '6px' },
  navPill: {
    background: 'var(--secondary)',
    color: 'var(--secondary-foreground)',
    fontSize: '0.68rem',
    fontWeight: '600',
    padding: '3px 10px',
    borderRadius: '999px',
    border: '1px solid var(--border)'
  },
  themeBtn: {
    background: 'var(--muted)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    fontSize: '0.95rem',
    padding: '5px 8px',
    cursor: 'pointer',
    lineHeight: 1
  },

  /* Hero */
  hero: {
    borderBottom: '1px solid var(--border)',
    background: 'var(--card)',
    padding: '56px 24px 48px'
  },
  heroMobile: {
    borderBottom: '1px solid var(--border)',
    background: 'var(--card)',
    padding: '20px 16px 18px'
  },
  heroInner: {
    maxWidth: '680px',
    margin: '0 auto',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'var(--secondary)',
    color: 'var(--secondary-foreground)',
    border: '1px solid var(--border)',
    borderRadius: '999px',
    fontSize: '0.68rem',
    fontWeight: '600',
    padding: '4px 12px'
  },
  heroBadgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--beginner)',
    animation: 'pulse 2s ease infinite',
    flexShrink: 0
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: '800',
    lineHeight: '1.15',
    letterSpacing: '-0.02em',
    color: 'var(--foreground)'
  },
  heroTitleMobile: {
    fontSize: '1.55rem',
    fontWeight: '800',
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
    color: 'var(--foreground)'
  },
  heroAccent: { color: 'var(--primary)' },
  heroSub: {
    color: 'var(--muted-foreground)',
    fontSize: '0.95rem',
    lineHeight: '1.75',
    maxWidth: '480px'
  },
  statsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    justifyContent: 'center',
    marginTop: '4px'
  },
  statsMobile: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    justifyContent: 'center'
  },
  stat: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' },
  statNum: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: 'var(--foreground)',
    fontFamily: 'var(--font-mono)'
  },
  statNumSm: {
    fontSize: '1.05rem',
    fontWeight: '800',
    color: 'var(--foreground)',
    fontFamily: 'var(--font-mono)'
  },
  statLabel: {
    fontSize: '0.62rem',
    color: 'var(--muted-foreground)',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.06em'
  },
  statDivider: { width: '1px', height: '22px', background: 'var(--border)' },

  /* Main */
  main: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '20px 16px',
    flex: 1,
    width: '100%'
  },

  /* Filter sheet */
  filterSheet: {
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: 'calc(var(--radius) * 2)',
    padding: '16px',
    marginBottom: '14px',
    animation: 'fadeInUp 0.2s ease'
  },
  filterSheetHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px'
  },
  filterSheetTitle: {
    fontSize: '0.82rem',
    fontWeight: '700',
    color: 'var(--foreground)'
  },
  closeBtn: {
    background: 'var(--muted)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    color: 'var(--muted-foreground)',
    fontSize: '0.75rem',
    padding: '3px 8px',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)'
  },

  /* Results row */
  resultsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '14px',
    gap: '8px'
  },
  resultsText: {
    color: 'var(--muted-foreground)',
    fontSize: '0.8rem',
    fontWeight: '600'
  },
  showAllBtn: {
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--muted-foreground)',
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '4px 10px',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)'
  },

  /* Grids */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px'
  },
  gridMobile: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },

  /* States */
  aiLoadingBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    background: 'var(--secondary)',
    border: '1px solid var(--border)',
    borderRadius: 'calc(var(--radius) * 2)',
    padding: '16px 18px',
    marginBottom: '14px'
  },
  aiLoadingIcon: {
    fontSize: '1.5rem',
    animation: 'spin 2s linear infinite',
    flexShrink: 0
  },
  aiLoadingTitle: {
    fontWeight: '700',
    fontSize: '0.88rem',
    color: 'var(--foreground)',
    marginBottom: '2px'
  },
  aiLoadingSubtitle: {
    fontSize: '0.75rem',
    color: 'var(--muted-foreground)'
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '60px 0',
    gap: '14px'
  },
  spinner: {
    width: '30px',
    height: '30px',
    border: '3px solid var(--border)',
    borderTop: '3px solid var(--primary)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  },
  loadingText: { color: 'var(--muted-foreground)', fontSize: '0.85rem' },
  errorBox: {
    background: 'oklch(0.6271 0.1936 33.3390 / 0.08)',
    border: '1px solid oklch(0.6271 0.1936 33.3390 / 0.3)',
    borderRadius: 'calc(var(--radius) * 2)',
    padding: '18px',
    textAlign: 'center'
  },
  errorTitle: { color: 'var(--destructive)', fontWeight: '700', fontSize: '0.88rem', marginBottom: '4px' },
  errorSub:   { color: 'var(--muted-foreground)', fontSize: '0.78rem' },
  emptyBox: {
    textAlign: 'center',
    padding: '60px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    alignItems: 'center'
  },
  emptyTitle: { fontWeight: '700', fontSize: '0.92rem', color: 'var(--foreground)' },
  emptySub:   { color: 'var(--muted-foreground)', fontSize: '0.8rem' },

  /* Bottom Nav */
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'var(--card)',
    borderTop: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '8px 8px 18px',
    zIndex: 300
  },
  bottomBtn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '6px 2px',
    borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-sans)'
  },
  bottomBtnPrimary: {
    flex: 1.3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
    background: 'var(--primary)',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 2px',
    borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-sans)',
    transition: 'opacity 0.15s'
  },
  bottomIcon:  { fontSize: '1.05rem', lineHeight: 1 },
  bottomLabel: {
    fontSize: '0.6rem',
    fontWeight: '600',
    color: 'var(--muted-foreground)',
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap'
  },

  /* Footer */
  footer: {
    borderTop: '1px solid var(--border)',
    padding: '18px 24px',
    background: 'var(--card)'
  },
  footerInner: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '0.78rem',
    color: 'var(--muted-foreground)',
    fontWeight: '500',
    flexWrap: 'wrap'
  }
}

export default Home