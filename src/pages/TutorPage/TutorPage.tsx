import { Button } from '../../shared/ui/Button'
import { Container } from '../../shared/ui/Container'

import styles from './TutorPage.module.scss'

export function TutorPage() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <section className={styles.page}>
      <Container>
        <header className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Tutor</h1>
            <p className={styles.subtitle}>
              Personalized tutoring in math, informatics and programming — focused on clear structure,
              confidence and measurable progress.
            </p>

            <div className={styles.actions}>
              <Button
                variant="primary"
                type="button"
                onClick={() => {
                  scrollTo('apply')
                }}
              >
                Apply
              </Button>

              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  scrollTo('pricing')
                }}
              >
                Pricing
              </Button>
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.orb} />
            <div className={styles.grid} />
          </div>
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