

import { Button } from '../../shared/ui/Button'
import { Container } from '../../shared/ui/Container'

import styles from './DevPage.module.scss'

export function DevPage() {
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
            <h1 className={styles.title}>Dev</h1>
            <p className={styles.subtitle}>
              Web development and product engineering — clean architecture, thoughtful UI, and reliable delivery.
            </p>

            <div className={styles.actions}>
              <Button
                variant="primary"
                type="button"
                onClick={() => {
                  scrollTo('contacts')
                }}
              >
                Contacts
              </Button>

              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  scrollTo('cases')
                }}
              >
                Cases
              </Button>
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.orb} />
            <div className={styles.grid} />
          </div>
        </header>

        <section id="about" className={styles.section}>
          <h2 className={styles.h2}>About</h2>
          <p className={styles.text}>Section scaffold (will be filled later).</p>
        </section>

        <section id="services" className={styles.section}>
          <h2 className={styles.h2}>Services</h2>
          <p className={styles.text}>Section scaffold (will be filled later).</p>
        </section>

        <section id="cases" className={styles.section}>
          <h2 className={styles.h2}>Cases</h2>
          <p className={styles.text}>Section scaffold (will be filled later).</p>
        </section>

        <section id="process" className={styles.section}>
          <h2 className={styles.h2}>Process</h2>
          <p className={styles.text}>Section scaffold (will be filled later).</p>
        </section>

        <section id="contacts" className={styles.section}>
          <h2 className={styles.h2}>Contacts</h2>
          <p className={styles.text}>Section scaffold (will be filled later).</p>
        </section>
      </Container>
    </section>
  )
}