import { useCallback, useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  House,
  BookOpen,
  ChatCircle,
  Star,
  Question,
  ArrowsClockwise,
  Envelope,
  GraduationCap,
  Code,
  CurrencyDollar,
  Briefcase,
  FolderSimple,
  Plus,
} from '@phosphor-icons/react'

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

  const mode: Mode = pathname.startsWith('/tutor') ? 'tutor' : pathname.startsWith('/dev') ? 'dev' : null

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
    const size = 22
    const weight = 'light' as const

    switch (label) {
      case 'MODE_TUTOR':
        return <GraduationCap size={size} weight={weight} />
      case 'MODE_DEV':
        return <Code size={size} weight={weight} />
      case 'Directions':
        return <BookOpen size={size} weight={weight} />
      case 'About':
        return <House size={size} weight={weight} />
      case 'Pricing':
        return <CurrencyDollar size={size} weight={weight} />
      case 'Services':
        return <Briefcase size={size} weight={weight} />
      case 'Reviews':
        return <Star size={size} weight={weight} />
      case 'Cases':
        return <FolderSimple size={size} weight={weight} />
      case 'FAQ':
        return <Question size={size} weight={weight} />
      case 'Process':
        return <ArrowsClockwise size={size} weight={weight} />
      case 'Apply':
        return <ChatCircle size={size} weight={weight} />
      case 'Contacts':
        return <Envelope size={size} weight={weight} />
      default:
        return <Plus size={size} weight={weight} />
    }
  }

  return (
    <>
      <header className={[styles.header, isLanding ? styles.isLanding : styles.isExpanded].join(' ')}>
        <Container>
          <div className={styles.row}>
            <div className={styles.pillsRow}>
              <div className={styles.modePill}>
                <div className={styles.segmentWrap}>
                  <NavLink
                    to="/tutor"
                    className={({ isActive }) => [styles.navLink, isActive ? styles.navLinkActive : ''].filter(Boolean).join(' ')}
                  >
                    <Button variant="ghost" type="button">
                      Tutor
                    </Button>
                  </NavLink>

                  <div className={styles.segmentDivider} />

                  <NavLink
                    to="/dev"
                    className={({ isActive }) => [styles.navLink, isActive ? styles.navLinkActive : ''].filter(Boolean).join(' ')}
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

          <div className={styles.mobileModeWrap}>
            <button
              type="button"
              className={styles.mobileModeButton}
              aria-label={mode === 'tutor' ? 'Switch to Dev' : 'Switch to Tutor'}
              onClick={() => {
                navigate(mode === 'tutor' ? '/dev' : '/tutor')
              }}
            >
              <span className={styles.mobileModeIcon}>{mode === 'tutor' ? renderIcon('MODE_DEV') : renderIcon('MODE_TUTOR')}</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}