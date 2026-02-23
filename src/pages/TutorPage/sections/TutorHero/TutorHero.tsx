import { Container } from '../../../../shared/ui/Container'

import styles from './TutorHero.module.scss'

// TODO: положи вырезанный силуэт сюда (png/webp с прозрачным фоном)
import markSilhouette from '../../../../assets/images/mark-silhouette.png'

export function TutorHero() {
  return (
    <section id="hero" className={styles.hero}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.left}>
            <h1 className={styles.name}>
              Марк <span className={styles.surname}>Шарапов</span>
            </h1>

            <p className={styles.tagline}>
              Индивидуальные занятия по математике, информатике и программированию — с акцентом на четкую структуру,
уверенность и измеримый прогресс.
            </p>

            <div className={styles.actions}>
              <a className={styles.primaryLink} href="#apply">
                К заяквке
              </a>

              <a className={styles.secondaryLink} href="#pricing">
                К ценам
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