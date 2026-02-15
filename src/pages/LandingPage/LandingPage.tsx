import { NavLink } from 'react-router-dom'

import { Button } from '../../shared/ui/Button'
import { Container } from '../../shared/ui/Container'

import styles from './LandingPage.module.scss'

export function LandingPage() {
  return (
    <section className={styles.page}>
      <Container>
        <div className={styles.center}>
          <div className={styles.glass}>
            <NavLink to="/tutor" className={styles.link}>
              <Button variant="ghost" type="button">
                Tutor
              </Button>
            </NavLink>
            <div className={styles.divider} />
            <NavLink to="/dev" className={styles.link}>
              <Button variant="ghost" type="button">
                Dev
              </Button>
            </NavLink>
          </div>
          <p className={styles.hint}>Choose a mode to continue</p>
        </div>
      </Container>
    </section>
  )
}