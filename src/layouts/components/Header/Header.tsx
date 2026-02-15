import { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

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

  const isLanding = pathname === '/'

  const mode: Mode = pathname.startsWith('/tutor')
    ? 'tutor'
    : pathname.startsWith('/dev')
      ? 'dev'
      : null

  const menu = mode === 'tutor' ? tutorMenu : mode === 'dev' ? devMenu : []

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
  }, [idToLabel, isLanding, mode, setActiveMenuState])

  return (
    <header className={[styles.header, isLanding ? styles.isLanding : styles.isExpanded].join(' ')}>
      <Container>
        <div className={styles.row}>
          <div className={styles.pill}>
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

            <div className={styles.pillMenu} aria-hidden={isLanding || !mode}>
              {!isLanding && mode && (
                <nav className={styles.menu} aria-label={`${mode} sections`}>
                  {menu.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className={[
                        styles.menuLink,
                        activeMenu === item.label ? styles.menuLinkActive : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={(e) => {
                        e.preventDefault()
                        setActiveMenuState({ mode, label: item.label })

                        if (item.href.startsWith('#')) {
                          const id = item.href.slice(1)
                          const el = document.getElementById(id)
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            window.history.replaceState(null, '', item.href)
                          }
                        }
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
  )
}