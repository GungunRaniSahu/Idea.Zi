import React from 'react'

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']
const categories   = ['All', 'Web', 'AI', 'Mobile', 'Game', 'CLI', 'API']
const stacks       = ['All', 'React', 'Node', 'MongoDB', 'Python', 'Socket.io', 'OpenAI API']

function FilterBar({ filters, setFilters, onRandom, onGenerate, isGenerating, darkMode, setDarkMode }) {

  const handleChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'All' ? '' : value
    }))
  }

  const hasFilters = filters.difficulty || filters.category || filters.stack

  const clearAll = () => {
    setFilters({ difficulty: '', category: '', stack: '' })
  }

  return (
    <div style={styles.wrapper}>

      {/* ── Top Row: Label + Clear + Dark Mode ── */}
      <div style={styles.topRow}>
        <span style={styles.filterLabel}>🎯 Filter Ideas</span>
        <div style={styles.topActions}>
          {hasFilters && (
            <button onClick={clearAll} style={styles.clearAllBtn}>
              ✕ Clear filters
            </button>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={styles.themeBtn}
            title="Toggle theme"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* ── Filter Row ── */}
      <div style={styles.filtersAndButtons}>

        <div style={styles.filters}>

          <div style={styles.group}>
            <label style={styles.label}>Difficulty</label>
            <select
              style={styles.select}
              value={filters.difficulty || 'All'}
              onChange={e => handleChange('difficulty', e.target.value)}
            >
              {difficulties.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Category</label>
            <select
              style={styles.select}
              value={filters.category || 'All'}
              onChange={e => handleChange('category', e.target.value)}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Stack</label>
            <select
              style={styles.select}
              value={filters.stack || 'All'}
              onChange={e => handleChange('stack', e.target.value)}
            >
              {stacks.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

        </div>

        {/* ── Action Buttons ── */}
        <div style={styles.buttons}>
          <button onClick={onRandom} style={styles.surpriseBtn}>
            🎲 Surprise Me
          </button>
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            style={{
              ...styles.aiBtn,
              opacity: isGenerating ? 0.75 : 1,
              cursor: isGenerating ? 'not-allowed' : 'pointer'
            }}
          >
            {isGenerating
              ? <><span style={styles.spinIcon}>⏳</span> Generating...</>
              : <>✨ Generate with AI</>
            }
          </button>
        </div>

      </div>

    </div>
  )
}

const styles = {
  wrapper: {
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: 'calc(var(--radius) * 2)',
    padding: '20px 24px',
    marginBottom: '28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filterLabel: {
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--muted-foreground)'
  },
  topActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  clearAllBtn: {
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--muted-foreground)',
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '4px 10px'
  },
  themeBtn: {
    background: 'var(--muted)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    fontSize: '1rem',
    padding: '4px 10px',
    lineHeight: 1
  },
  filtersAndButtons: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '16px',
    flexWrap: 'wrap'
  },
  filters: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    flex: 1
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    minWidth: '130px',
    flex: 1
  },
  label: {
    fontSize: '0.72rem',
    fontWeight: '600',
    color: 'var(--muted-foreground)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em'
  },
  select: {
    background: 'var(--background)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--foreground)',
    padding: '8px 12px',
    fontSize: '0.85rem',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    cursor: 'pointer',
    width: '100%'
  },
  buttons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    flexShrink: 0
  },
  surpriseBtn: {
    padding: '9px 18px',
    background: 'var(--secondary)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--secondary-foreground)',
    fontWeight: '700',
    fontSize: '0.85rem',
    fontFamily: 'var(--font-sans)',
    transition: 'opacity 0.15s',
    whiteSpace: 'nowrap'
  },
  aiBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '9px 20px',
    background: 'var(--primary)',
    border: 'none',
    borderRadius: 'var(--radius)',
    color: 'var(--primary-foreground)',
    fontWeight: '700',
    fontSize: '0.85rem',
    fontFamily: 'var(--font-sans)',
    transition: 'opacity 0.15s',
    whiteSpace: 'nowrap'
  }
}

export default FilterBar