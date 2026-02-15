import { NavLink } from 'react-router-dom'

import { Container } from '../../../shared/ui/Container'

import styles from './Header.module.scss'

export function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <NavLink
            to="/tutor"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Tutor
          </NavLink>

          <NavLink
            to="/dev"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Dev
          </NavLink>
        </div>
      </Container>
    </header>
  )
}