import { Container } from '../../../../shared/ui/Container'

import styles from './DevHero.module.scss'

// Reuse the same cutout silhouette image
import markSilhouette from '../../../../assets/images/markProg.png'

export function DevHero() {
  return (
    <section id="hero" className={styles.hero}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.left}>
            <h1 className={styles.name}>
              Mark <span className={styles.surname}>Sharapov</span>
            </h1>

            <p className={styles.tagline}>
              Web development & product engineering — React/TypeScript, clean UI systems and fast iterations.
              I build landing pages and interfaces that look premium and ship reliably.
            </p>

            <div className={styles.actions}>
              <a className={styles.primaryLink} href="#contacts">
                Contacts
              </a>

              <a className={styles.secondaryLink} href="#cases">
                Cases
              </a>
            </div>
          </div>

          <div className={styles.right} aria-hidden>
            <div className={styles.photoWrap}>
              <img className={styles.photo} src={markSilhouette} alt="" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}