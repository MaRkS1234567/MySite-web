import { useCallback, useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import { Button } from '../../../shared/ui/Button'
import { Container } from '../../../shared/ui/Container'

import styles from './Header.module.scss'

type Mode = 'tutor' | 'dev' | null

type MenuItem = {
  label: string
  href: string
}

const tutorMenu: MenuItem[] = [
  { label: 'Directions', href: '#directions' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Apply', href: '#apply' },
]

const devMenu: MenuItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Cases', href: '#cases' },
  { label: 'Process', href: '#process' },
  { label: 'Contacts', href: '#contacts' },
]

export function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isLanding = pathname === '/'

  const mode: Mode = pathname.startsWith('/tutor')
    ? 'tutor'
    : pathname.startsWith('/dev')
      ? 'dev'
      : null

  const menu = mode === 'tutor' ? tutorMenu : mode === 'dev' ? devMenu : []

  const hrefToId = useCallback((href: string) => {
    if (!href.startsWith('#')) return ''
    return href.slice(1)
  }, [])

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }, [])

  const [activeMenuState, setActiveMenuState] = useState<{ mode: Mode; label: string }>({
    mode: null,
    label: '',
  })

  const activeMenu = activeMenuState.mode === mode ? activeMenuState.label : ''

  const idToLabel = useMemo(() => {
    return new Map(
      menu
        .filter((i) => i.href.startsWith('#'))
        .map((i) => [i.href.slice(1), i.label] as const),
    )
  }, [menu])

  // Auto-highlight the current section while scrolling
  useEffect(() => {
    if (isLanding || !mode) return
    if (idToLabel.size === 0) return

    const sectionIds = Array.from(idToLabel.keys())
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the most visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))

        const top = visible[0]
        if (!top) return

        const id = (top.target as HTMLElement).id
        const label = idToLabel.get(id)
        if (!label) return

        setActiveMenuState({ mode, label })
      },
      {
        // Trigger when the section is roughly in the upper half of the viewport
        root: null,
        threshold: [0.15, 0.25, 0.4, 0.6],
        rootMargin: '-20% 0px -55% 0px',
      },
    )

    elements.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
    }
  }, [idToLabel, isLanding, mode])

  const renderIcon = (label: string) => {
    // Simple inline SVGs (no assets). Keep them minimal and consistent.
    const common = {
      width: 22,
      height: 22,
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    }

    switch (label) {
      case 'MODE_TUTOR':
        return (
          <svg {...common}>
            <path d="M12 4l9 4-9 4-9-4 9-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M6 10v5c0 1.6 2.7 3 6 3s6-1.4 6-3v-5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        )
      case 'MODE_DEV':
        return (
          <svg {...common}>
            <path d="M9 8l-3 4 3 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 8l3 4-3 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 7l-2 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )
      case 'Directions':
      case 'About':
        return (
          <svg {...common}>
            <path d="M12 3l8 6v11H4V9l8-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        )
      case 'Pricing':
      case 'Services':
        return (
          <svg {...common}>
            <path d="M7 7h10v10H7V7z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M9.5 11h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M9.5 14h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )
      case 'Reviews':
      case 'Cases':
        return (
          <svg {...common}>
            <path d="M7 4h10a2 2 0 012 2v12l-3-2H7a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        )
      case 'FAQ':
      case 'Process':
        return (
          <svg {...common}>
            <path d="M12 22a10 10 0 100-20 10 10 0 000 20z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M9.8 9.2a2.3 2.3 0 114 1.7c-.5.6-1.3.9-1.3 2.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M12 17h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )
      case 'Apply':
      case 'Contacts':
        return (
          <svg {...common}>
            <path d="M20 6l-8.5 7L3 6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M4 6h16v12H4V6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        )
      default:
        return (
          <svg {...common}>
            <path d="M6 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M12 6v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )
    }
  }

  return (
    <>
      {/* Desktop / tablet header (existing pill) */}
      <header className={[styles.header, isLanding ? styles.isLanding : styles.isExpanded].join(' ')}>
        <Container>
          <div className={styles.row}>
            <div className={styles.pillsRow}>
              <div className={styles.modePill}>
                <div className={styles.segmentWrap}>
                  <NavLink
                    to="/tutor"
                    className={({ isActive }) =>
                      [styles.navLink, isActive ? styles.navLinkActive : ''].filter(Boolean).join(' ')
                    }
                  >
                    <Button variant="ghost" type="button">
                      Tutor
                    </Button>
                  </NavLink>

                  <div className={styles.segmentDivider} />

                  <NavLink
                    to="/dev"
                    className={({ isActive }) =>
                      [styles.navLink, isActive ? styles.navLinkActive : ''].filter(Boolean).join(' ')
                    }
                  >
                    <Button variant="ghost" type="button">
                      Dev
                    </Button>
                  </NavLink>
                </div>
              </div>

              <div className={styles.sectionsPill} aria-hidden={isLanding || !mode}>
                {!isLanding && mode && (
                  <nav className={styles.menu} aria-label={`${mode} sections`}>
                    {menu.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className={[styles.menuLink, activeMenu === item.label ? styles.menuLinkActive : '']
                          .filter(Boolean)
                          .join(' ')}
                        onClick={(e) => {
                          e.preventDefault()
                          setActiveMenuState({ mode, label: item.label })

                          const id = hrefToId(item.href)
                          if (id) scrollToId(id)
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                )}
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile bottom navigation */}
      {!isLanding && mode && (
        <div className={styles.mobileBar}>
          <nav className={styles.mobileNav} aria-label={`${mode} mobile navigation`}>
            {menu.map((item) => {
              const isActive = activeMenu === item.label
              const id = hrefToId(item.href)

              return (
                <button
                  key={item.label}
                  type="button"
                  aria-label={item.label}
                  className={[styles.mobileItem, isActive ? styles.mobileItemActive : ''].filter(Boolean).join(' ')}
                  onClick={() => {
                    setActiveMenuState({ mode, label: item.label })
                    if (id) scrollToId(id)
                  }}
                >
                  <span className={styles.mobileIcon}>{renderIcon(item.label)}</span>
                </button>
              )
            })}
          </nav>

          {/* Separate circular mode switch (Telegram/Apple-like) */}
          <div className={styles.mobileModeWrap}>
            <button
              type="button"
              className={styles.mobileModeButton}
              aria-label={mode === 'tutor' ? 'Switch to Dev' : 'Switch to Tutor'}
              onClick={() => {
                navigate(mode === 'tutor' ? '/dev' : '/tutor')
              }}
            >
              <span className={styles.mobileModeIcon}>
                {mode === 'tutor' ? renderIcon('MODE_DEV') : renderIcon('MODE_TUTOR')}
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}