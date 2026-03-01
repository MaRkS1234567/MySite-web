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
              Марк <span className={styles.surname}>Шарапов</span>
            </h1>

            <p className={styles.tagline}>
              Веб-разработка и разработка продуктов — React/TypeScript, чистые UI-системы и быстрые итерации.
Я создаю целевые страницы и интерфейсы, которые выглядят премиально и надежно работают.
            </p>

            <div className={styles.actions}>
              <a className={styles.primaryLink} href="#contacts">
                Контакты
              </a>

              <a className={styles.secondaryLink} href="#cases">
                Кейсы
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