import React from 'react'

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']
const categories   = ['All', 'Web', 'AI', 'Mobile', 'Game', 'CLI', 'API']
const stacks       = ['All', 'React', 'Node', 'MongoDB', 'Python', 'Socket.io', 'OpenAI API']

function FilterBar({ filters, setFilters, onRandom }) {

  const handleChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'All' ? '' : value
    }))
  }

  return (
    <div style={styles.wrapper}>

      {/* ── Filter Selects ── */}
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

      {/* ── Surprise Me Button ── */}
      <button onClick={onRandom} style={styles.surpriseBtn}>
        🎲 Surprise Me
      </button>

    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
    padding: '24px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    marginBottom: '32px'
  },
  filters: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  select: {
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text)',
    padding: '8px 14px',
    fontSize: '0.9rem',
    outline: 'none',
    cursor: 'pointer',
    minWidth: '150px'
  },
  surpriseBtn: {
    padding: '10px 22px',
    background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: '700',
    fontSize: '0.95rem',
    transition: 'opacity 0.2s'
  }
}

export default FilterBar