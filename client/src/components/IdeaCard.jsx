import React, { useState } from 'react'

const difficultyConfig = {
  Beginner:     { color: 'var(--beginner)',  bg: 'oklch(0.65 0.15 145 / 0.12)',  border: 'oklch(0.65 0.15 145 / 0.3)'  },
  Intermediate: { color: 'var(--inter)',     bg: 'oklch(0.75 0.15 65 / 0.12)',   border: 'oklch(0.75 0.15 65 / 0.3)'   },
  Advanced:     { color: 'var(--advanced)',  bg: 'oklch(0.55 0.18 25 / 0.12)',   border: 'oklch(0.55 0.18 25 / 0.3)'   },
}

function IdeaCard({ idea, isAI = false }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const diff = difficultyConfig[idea.difficulty] || difficultyConfig['Beginner']

  const copyAsMarkdown = () => {
    const md = `# ${idea.title}\n\n## Description\n${idea.description}\n\n## Tech Stack\n${idea.stack.join(', ')}\n\n## Features\n${idea.features.map(f => `- ${f}`).join('\n')}\n\n## Bonus Challenges\n${idea.bonusChallenges.map(b => `- ${b}`).join('\n')}\n`
    navigator.clipboard.writeText(md)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fade-in-up" style={styles.card}>

      {/* AI Badge */}
      {isAI && (
        <div style={styles.aiBadge}>✨ AI Generated</div>
      )}

      {/* Top Row */}
      <div style={styles.topRow}>
        <h2 style={styles.title}>{idea.title}</h2>
        <div style={styles.badges}>
          <span style={{
            ...styles.badge,
            background: diff.bg,
            color: diff.color,
            border: `1px solid ${diff.border}`
          }}>
            {idea.difficulty}
          </span>
          <span style={styles.categoryBadge}>{idea.category}</span>
        </div>
      </div>

      {/* Description */}
      <p style={styles.description}>{idea.description}</p>

      {/* Stack Tags */}
      <div style={styles.stackRow}>
        {idea.stack.map((tech, i) => (
          <span key={i} style={styles.tag}>
            <span style={styles.tagDot} />
            {tech}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Features */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>
          <span style={styles.sectionIcon}>▸</span> Core Features
        </h4>
        <ul style={styles.list}>
          {idea.features.map((f, i) => (
            <li key={i} style={styles.listItem}>
              <span style={{ ...styles.dot, background: 'var(--primary)' }} />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Bonus — collapsible */}
      <div style={styles.section}>
        <button
          onClick={() => setExpanded(!expanded)}
          style={styles.bonusToggle}
        >
          <span style={{ ...styles.sectionIcon, color: 'var(--advanced)' }}>▸</span>
          <span style={{ ...styles.sectionTitle, marginBottom: 0 }}>
            Bonus Challenges
          </span>
          <span style={{
            marginLeft: 'auto',
            fontSize: '0.75rem',
            color: 'var(--muted-foreground)',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.2s'
          }}>▼</span>
        </button>

        {expanded && (
          <ul style={{ ...styles.list, marginTop: '10px' }}>
            {idea.bonusChallenges.map((b, i) => (
              <li key={i} style={styles.listItem}>
                <span style={{ ...styles.dot, background: 'var(--advanced)' }} />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div style={styles.cardFooter}>
        <button onClick={copyAsMarkdown} style={styles.copyBtn}>
          {copied
            ? <><span>✅</span> Copied!</>
            : <><span>📋</span> Copy as Markdown</>
          }
        </button>
        <span style={styles.ideaNum}>#{Math.abs(idea._id?.toString().slice(-4) || '0000')}</span>
      </div>

    </div>
  )
}

const styles = {
  card: {
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: 'calc(var(--radius) * 2)',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  aiBadge: {
    position: 'absolute',
    top: '0',
    right: '0',
    background: 'var(--primary)',
    color: 'var(--primary-foreground)',
    fontSize: '0.7rem',
    fontWeight: '700',
    padding: '4px 12px',
    borderBottomLeftRadius: 'calc(var(--radius) * 2)',
    letterSpacing: '0.03em'
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
    flexWrap: 'wrap',
    paddingRight: '80px'
  },
  title: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: 'var(--card-foreground)',
    lineHeight: '1.3'
  },
  badges: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    flexShrink: 0
  },
  badge: {
    fontSize: '0.7rem',
    fontWeight: '600',
    padding: '3px 10px',
    borderRadius: '999px',
    letterSpacing: '0.03em'
  },
  categoryBadge: {
    fontSize: '0.7rem',
    fontWeight: '600',
    padding: '3px 10px',
    borderRadius: '999px',
    background: 'var(--secondary)',
    color: 'var(--secondary-foreground)',
    border: '1px solid var(--border)'
  },
  description: {
    color: 'var(--muted-foreground)',
    fontSize: '0.88rem',
    lineHeight: '1.7'
  },
  stackRow: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap'
  },
  tag: {
    background: 'var(--muted)',
    color: 'var(--foreground)',
    fontSize: '0.72rem',
    padding: '4px 10px',
    borderRadius: '6px',
    fontWeight: '600',
    fontFamily: 'var(--font-mono)',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    border: '1px solid var(--border)'
  },
  tagDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: 'var(--primary)',
    flexShrink: 0
  },
  divider: {
    height: '1px',
    background: 'var(--border)'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  sectionTitle: {
    fontSize: '0.72rem',
    fontWeight: '700',
    color: 'var(--foreground)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '2px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  sectionIcon: {
    color: 'var(--primary)',
    fontSize: '0.8rem'
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  listItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    fontSize: '0.85rem',
    color: 'var(--muted-foreground)',
    lineHeight: '1.5'
  },
  dot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    flexShrink: 0,
    marginTop: '6px'
  },
  bonusToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    background: 'transparent',
    border: 'none',
    padding: '0',
    width: '100%',
    textAlign: 'left',
    color: 'var(--foreground)',
    cursor: 'pointer'
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '4px',
    paddingTop: '12px',
    borderTop: '1px solid var(--border)'
  },
  copyBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '7px 14px',
    background: 'var(--muted)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--muted-foreground)',
    fontSize: '0.78rem',
    fontWeight: '600',
    transition: 'all 0.15s'
  },
  ideaNum: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.72rem',
    color: 'var(--muted-foreground)',
    opacity: 0.5
  }
}

export default IdeaCard