import { Link } from 'react-router-dom'

import styles from './NotFoundPage.module.scss'

export function NotFoundPage() {
  return (
    <section className={styles.page}>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/tutor">Go to Tutor</Link>
    </section>
  )
}
