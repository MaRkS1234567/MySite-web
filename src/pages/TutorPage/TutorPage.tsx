

import { Container } from '../../shared/ui/Container'

import styles from './TutorPage.module.scss'

export function TutorPage() {
  return (
    <section className={styles.page}>
      <Container>
        <header className={styles.hero}>
          <h1 className={styles.title}>Tutor</h1>
          <p className={styles.subtitle}>Tutor page scaffold.</p>
        </header>

        <section id="directions" className={styles.section}>
          <h2 className={styles.h2}>Directions</h2>
          <p className={styles.text}>Section scaffold (will be filled later).</p>
        </section>

        <section id="pricing" className={styles.section}>
          <h2 className={styles.h2}>Pricing</h2>
          <p className={styles.text}>Section scaffold (will be filled later).</p>
        </section>

        <section id="reviews" className={styles.section}>
          <h2 className={styles.h2}>Reviews</h2>
          <p className={styles.text}>Section scaffold (will be filled later).</p>
        </section>

        <section id="faq" className={styles.section}>
          <h2 className={styles.h2}>FAQ</h2>
          <p className={styles.text}>Section scaffold (will be filled later).</p>
        </section>

        <section id="apply" className={styles.section}>
          <h2 className={styles.h2}>Apply</h2>
          <p className={styles.text}>Section scaffold (will be filled later).</p>
        </section>
      </Container>
    </section>
  )
}