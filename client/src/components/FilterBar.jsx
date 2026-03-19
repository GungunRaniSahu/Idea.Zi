import React from 'react'

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']
const categories   = ['All', 'Web', 'AI', 'Mobile', 'Game', 'CLI', 'API']
const stacks       = ['All', 'React', 'Node', 'MongoDB', 'Python', 'Socket.io', 'OpenAI API']

function FilterBar({ filters, setFilters, onRandom, onGenerate, isGenerating, darkMode, setDarkMode, isMobile }) {

  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value === 'All' ? '' : value }))
  }

  const hasFilters = filters.difficulty || filters.category || filters.stack

  const clearAll = () => setFilters({ difficulty: '', category: '', stack: '' })

  /* ── Mobile layout — stacked, full width ── */
  if (isMobile) {
    return (
      <div style={mobileStyles.wrapper}>

        {/* Selects — full width stacked */}
        {[
          { key: 'difficulty', label: 'Difficulty', options: difficulties },
          { key: 'category',   label: 'Category',   options: categories   },
          { key: 'stack',      label: 'Stack',       options: stacks       },
        ].map(({ key, label, options }) => (
          <div key={key} style={mobileStyles.group}>
            <label style={mobileStyles.label}>{label}</label>
            <select
              style={mobileStyles.select}
              value={filters[key] || 'All'}
              onChange={e => handleChange(key, e.target.value)}
            >
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        ))}

        {/* Clear filters */}
        {hasFilters && (
          <button onClick={clearAll} style={mobileStyles.clearBtn}>
            ✕ Clear all filters
          </button>
        )}

      </div>
    )
  }

  /* ── Desktop layout ── */
  return (
    <div style={desktopStyles.wrapper}>

      <div style={desktopStyles.topRow}>
        <span style={desktopStyles.filterLabel}>🎯 Filter Ideas</span>
        <div style={desktopStyles.topActions}>
          {hasFilters && (
            <button onClick={clearAll} style={desktopStyles.clearAllBtn}>
              ✕ Clear filters
            </button>
          )}
        </div>
      </div>

      <div style={desktopStyles.filtersAndButtons}>

        <div style={desktopStyles.filters}>
          {[
            { key: 'difficulty', label: 'Difficulty', options: difficulties },
            { key: 'category',   label: 'Category',   options: categories   },
            { key: 'stack',      label: 'Stack',       options: stacks       },
          ].map(({ key, label, options }) => (
            <div key={key} style={desktopStyles.group}>
              <label style={desktopStyles.label}>{label}</label>
              <select
                style={desktopStyles.select}
                value={filters[key] || 'All'}
                onChange={e => handleChange(key, e.target.value)}
              >
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div style={desktopStyles.buttons}>
          <button onClick={onRandom} style={desktopStyles.surpriseBtn}>
            🎲 Surprise Me
          </button>
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            style={{
              ...desktopStyles.aiBtn,
              opacity: isGenerating ? 0.75 : 1,
              cursor: isGenerating ? 'not-allowed' : 'pointer'
            }}
          >
            {isGenerating ? '⏳ Generating...' : '✨ Generate with AI'}
          </button>
        </div>

      </div>

    </div>
  )
}

/* ── Mobile styles ── */
const mobileStyles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  label: {
    fontSize: '0.7rem',
    fontWeight: '700',
    color: 'var(--muted-foreground)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em'
  },
  select: {
    background: 'var(--background)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--foreground)',
    padding: '10px 12px',
    fontSize: '0.88rem',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    cursor: 'pointer',
    width: '100%'
  },
  clearBtn: {
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--muted-foreground)',
    fontSize: '0.78rem',
    fontWeight: '600',
    padding: '8px 12px',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    marginTop: '4px'
  }
}

/* ── Desktop styles ── */
const desktopStyles = {
  wrapper: {
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: 'calc(var(--radius) * 2)',
    padding: '20px 24px',
    marginBottom: '24px',
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
    fontSize: '0.72rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--muted-foreground)'
  },
  topActions: { display: 'flex', alignItems: 'center', gap: '8px' },
  clearAllBtn: {
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--muted-foreground)',
    fontSize: '0.72rem',
    fontWeight: '600',
    padding: '4px 10px',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)'
  },
  filtersAndButtons: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '16px',
    flexWrap: 'wrap'
  },
  filters: { display: 'flex', gap: '14px', flexWrap: 'wrap', flex: 1 },
  group: { display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '130px', flex: 1 },
  label: {
    fontSize: '0.7rem',
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
  buttons: { display: 'flex', gap: '10px', flexShrink: 0 },
  surpriseBtn: {
    padding: '8px 16px',
    background: 'var(--secondary)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--secondary-foreground)',
    fontWeight: '700',
    fontSize: '0.82rem',
    fontFamily: 'var(--font-sans)',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  aiBtn: {
    padding: '8px 18px',
    background: 'var(--primary)',
    border: 'none',
    borderRadius: 'var(--radius)',
    color: 'var(--primary-foreground)',
    fontWeight: '700',
    fontSize: '0.82rem',
    fontFamily: 'var(--font-sans)',
    transition: 'opacity 0.15s',
    whiteSpace: 'nowrap'
  }
}

export default FilterBar