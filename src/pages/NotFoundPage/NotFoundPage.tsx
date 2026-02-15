import { Link } from 'react-router-dom'

import { Container } from '../../shared/ui/Container'

import styles from './NotFoundPage.module.scss'

export function NotFoundPage() {
  return (
    <section className={styles.page}>
      <Container>
        <h1>404</h1>
        <p>Page not found.</p>
        <Link to="/tutor">Go to Tutor</Link>
      </Container>
    </section>
  )
}
