import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'

import styles from './GitHubStats.module.scss'

// ── GitHub API types ────────────────────────────────────────────────────────

interface GitHubUser {
  public_repos: number
  created_at: string
}

interface GitHubRepo {
  language: string | null
}

interface LanguageStat {
  name: string
  count: number
}

interface StatsData {
  repos: number
  yearsOnGitHub: number
  topLanguages: LanguageStat[]
}

// ── Cache ───────────────────────────────────────────────────────────────────

interface CacheEntry {
  data: StatsData
  timestamp: number
}

const CACHE_KEY = 'github_stats_cache'
const CACHE_TTL = 30 * 60 * 1000

function readCache(): StatsData | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const entry: CacheEntry = JSON.parse(raw) as CacheEntry
    if (Date.now() - entry.timestamp > CACHE_TTL) return null
    return entry.data
  } catch {
    return null
  }
}

function writeCache(data: StatsData): void {
  try {
    const entry: CacheEntry = { data, timestamp: Date.now() }
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry))
  } catch {
    // ignore — sessionStorage may be unavailable
  }
}

// ── Fallback (shown on fetch error / offline) ───────────────────────────────

const FALLBACK: StatsData = {
  repos: 40,
  yearsOnGitHub: 4,
  topLanguages: [
    { name: 'TypeScript', count: 8 },
    { name: 'Python', count: 6 },
    { name: 'JavaScript', count: 4 },
    { name: 'CSS', count: 2 },
  ],
}

// ── Component ───────────────────────────────────────────────────────────────

export function GitHubStats() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<StatsData | null>(null)

  useEffect(() => {
    const cached = readCache()
    if (cached) {
      setStats(cached)
      setLoading(false)
      return
    }

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/marksharapovDev'),
          fetch('https://api.github.com/users/marksharapovDev/repos?per_page=100&sort=updated'),
        ])

        if (!userRes.ok || !reposRes.ok) throw new Error('api error')

        const [user, repos] = (await Promise.all([
          userRes.json(),
          reposRes.json(),
        ])) as [GitHubUser, GitHubRepo[]]

        const yearsOnGitHub =
          new Date().getFullYear() - new Date(user.created_at).getFullYear()

        const langCount: Record<string, number> = {}
        for (const repo of repos) {
          if (repo.language) {
            langCount[repo.language] = (langCount[repo.language] ?? 0) + 1
          }
        }

        const topLanguages: LanguageStat[] = Object.entries(langCount)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 4)
          .map(([name, count]) => ({ name, count }))

        const data: StatsData = {
          repos: user.public_repos,
          yearsOnGitHub,
          topLanguages,
        }

        writeCache(data)
        setStats(data)
      } catch {
        // silently fall back — shown via display below
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const display: StatsData = stats ?? FALLBACK
  const maxCount = display.topLanguages[0]?.count ?? 1

  if (loading) {
    return (
      <div className={styles.root}>
        <div className={styles.statsRow}>
          <div className={styles.skeletonBlock} style={{ width: 52, height: 34 } as CSSProperties} />
          <div className={styles.skeletonBlock} style={{ width: 52, height: 34 } as CSSProperties} />
        </div>
        <div className={styles.languageTags}>
          {[88, 58, 76, 46].map((w) => (
            <div key={w} className={styles.skeletonBlock} style={{ width: w, height: 24 } as CSSProperties} />
          ))}
        </div>
        <div className={styles.languageBars}>
          {[100, 75, 50, 25].map((pct) => (
            <div key={pct} className={styles.langBarRow}>
              <div className={styles.skeletonBlock} style={{ width: 72, height: 10 } as CSSProperties} />
              <div className={styles.skeletonBar} style={{ width: `${pct}%` } as CSSProperties} />
              <div className={styles.skeletonBlock} style={{ width: 18, height: 10 } as CSSProperties} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      {/* Row 1 — two stat numbers */}
      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{display.repos}</span>
          <span className={styles.statLabel}>
            публичных
            <br />
            репозитория
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{display.yearsOnGitHub}</span>
          <span className={styles.statLabel}>
            года
            <br />
            на GitHub
          </span>
        </div>
      </div>

      {/* Row 2 — top language tags */}
      <div className={styles.languageTags}>
        {display.topLanguages.map(({ name }) => (
          <span key={name} className={styles.languageTag}>
            {name}
          </span>
        ))}
      </div>

      {/* Row 3 — language breakdown bars */}
      <div className={styles.languageBars}>
        {display.topLanguages.map(({ name, count }) => (
          <div key={name} className={styles.langBarRow}>
            <span className={styles.langBarLabel}>{name}</span>
            <div className={styles.langBarTrack}>
              <div
                className={styles.langBarFill}
                style={
                  {
                    '--fill': `${Math.round((count / maxCount) * 100)}%`,
                  } as CSSProperties
                }
              />
            </div>
            <span className={styles.langBarCount}>{count}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
