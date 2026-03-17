import React, { useState } from 'react'

// Difficulty badge colors
const difficultyColor = {
  Beginner:     'var(--beginner)',
  Intermediate: 'var(--inter)',
  Advanced:     'var(--advanced)'
}

function IdeaCard({ idea }) {
  const [copied, setCopied] = useState(false)

  // ── Copy idea as Markdown ──
  const copyAsMarkdown = () => {
    const md = `# ${idea.title}

## Description
${idea.description}

## Tech Stack
${idea.stack.join(', ')}

## Features
${idea.features.map(f => `- ${f}`).join('\n')}

## Bonus Challenges
${idea.bonusChallenges.map(b => `- ${b}`).join('\n')}
`
    navigator.clipboard.writeText(md)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={styles.card}>

      {/* ── Top Row: Title + Badges ── */}
      <div style={styles.topRow}>
        <h2 style={styles.title}>{idea.title}</h2>
        <div style={styles.badges}>
          <span style={{
            ...styles.badge,
            background: difficultyColor[idea.difficulty] + '22',
            color: difficultyColor[idea.difficulty],
            border: `1px solid ${difficultyColor[idea.difficulty]}44`
          }}>
            {idea.difficulty}
          </span>
          <span style={styles.categoryBadge}>{idea.category}</span>
        </div>
      </div>

      {/* ── Description ── */}
      <p style={styles.description}>{idea.description}</p>

      {/* ── Stack Tags ── */}
      <div style={styles.stackRow}>
        {idea.stack.map((tech, i) => (
          <span key={i} style={styles.tag}>{tech}</span>
        ))}
      </div>

      {/* ── Features ── */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>✅ Features</h4>
        <ul style={styles.list}>
          {idea.features.map((f, i) => (
            <li key={i} style={styles.listItem}>
              <span style={styles.dot} />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Bonus Challenges ── */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>🔥 Bonus Challenges</h4>
        <ul style={styles.list}>
          {idea.bonusChallenges.map((b, i) => (
            <li key={i} style={styles.listItem}>
              <span style={{ ...styles.dot, background: 'var(--accent)' }} />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Copy Button ── */}
      <button onClick={copyAsMarkdown} style={styles.copyBtn}>
        {copied ? '✅ Copied!' : '📋 Copy as Markdown'}
      </button>

    </div>
  )
}

// ── Styles ──
const styles = {
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    transition: 'transform 0.2s, border-color 0.2s',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: 'var(--text)'
  },
  badges: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  badge: {
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '3px 10px',
    borderRadius: '999px'
  },
  categoryBadge: {
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '3px 10px',
    borderRadius: '999px',
    background: '#06b6d422',
    color: 'var(--accent2)',
    border: '1px solid #06b6d444'
  },
  description: {
    color: 'var(--muted)',
    fontSize: '0.95rem'
  },
  stackRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  tag: {
    background: 'var(--border)',
    color: 'var(--text)',
    fontSize: '0.75rem',
    padding: '4px 10px',
    borderRadius: '6px',
    fontWeight: '500'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  sectionTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    color: 'var(--muted)'
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--accent2)',
    flexShrink: 0
  },
  copyBtn: {
    marginTop: '8px',
    padding: '10px 16px',
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--muted)',
    fontSize: '0.85rem',
    fontWeight: '500',
    alignSelf: 'flex-start',
    transition: 'all 0.2s'
  }
}

export default IdeaCard