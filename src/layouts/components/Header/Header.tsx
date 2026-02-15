import { NavLink, useLocation } from 'react-router-dom'

import { Button } from '../../../shared/ui/Button'
import { Container } from '../../../shared/ui/Container'

import styles from './Header.module.scss'

type Mode = 'tutor' | 'dev' | null

const tutorMenu = [
  { label: 'Directions', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Reviews', href: '#' },
  { label: 'FAQ', href: '#' },
  { label: 'Apply', href: '#' },
]

const devMenu = [
  { label: 'About', href: '#' },
  { label: 'Services', href: '#' },
  { label: 'Cases', href: '#' },
  { label: 'Process', href: '#' },
  { label: 'Contacts', href: '#' },
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
                    <a key={item.label} href={item.href} className={styles.menuLink}>
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