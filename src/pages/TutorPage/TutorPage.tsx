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
          <p className={styles.text}>
            Leave a request — I’ll reply with a short plan and the nearest available time slots.
          </p>

          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault()
              // V1: visual-only. Later we’ll connect real sending (email/telegram/form backend).
              alert('Request sent! (demo)')
            }}
          >
            <div className={styles.formGrid}>
              <label className={styles.field}>
                <span className={styles.label}>Name</span>
                <input className={styles.input} name="name" type="text" placeholder="Your name" required />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Contact</span>
                <input
                  className={styles.input}
                  name="contact"
                  type="text"
                  placeholder="Telegram / phone / email"
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Direction</span>
                <select className={styles.input} name="direction" defaultValue="math" required>
                  <option value="math">Math</option>
                  <option value="informatics">Informatics</option>
                  <option value="programming">Programming</option>
                  <option value="oge">ОГЭ</option>
                  <option value="ege">ЕГЭ</option>
                </select>
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Goal</span>
                <input className={styles.input} name="goal" type="text" placeholder="Exam / grades / project" />
              </label>
            </div>

            <label className={styles.field}>
              <span className={styles.label}>Student situation / additional info</span>
              <textarea
                className={styles.textarea}
                name="details"
                rows={5}
                placeholder="Current level, what is difficult, deadline, preferred format, anything important…"
                required
              />
            </label>

            <div className={styles.formActions}>
              <Button variant="primary" type="submit">
                Send
              </Button>
              <span className={styles.hint}>No spam — only about your request.</span>
            </div>
          </form>
        </section>
      </Container>
    </section>
  )
}