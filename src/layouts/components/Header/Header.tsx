import { NavLink } from 'react-router-dom'

import { Button } from '../../../shared/ui/Button'
import { Container } from '../../../shared/ui/Container'

import styles from './Header.module.scss'

export function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
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
      </Container>
    </header>
  )
}