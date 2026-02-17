import { Container } from '../../shared/ui/Container'
import { DevHero } from './sections/DevHero/DevHero'

import styles from './DevPage.module.scss'

export function DevPage() {
  return (
    <section className={styles.page}>
      <DevHero />

      <Container>
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