import { useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '../../shared/ui/Button'
import { Container } from '../../shared/ui/Container'
import { scrollToSection } from '../../shared/lib/scrollToSection'
import { Directions } from './sections/Directions'
import { TutorHero } from './sections/TutorHero/TutorHero'

import type { FormPrefill } from './sections/Directions'

import styles from './TutorPage.module.scss'

const directionLabels: Record<string, { ru: string; en: string }> = {
  oge: { ru: 'Подготовка к ОГЭ', en: 'OGE Preparation' },
  ege: { ru: 'Подготовка к ЕГЭ', en: 'EGE Preparation' },
  programming: { ru: 'Программирование', en: 'Programming' },
  math: { ru: 'Математика', en: 'Mathematics' },
}

const intensityLabels: Record<string, { ru: string; en: string }> = {
  light: { ru: 'Лёгкий', en: 'Light' },
  standard: { ru: 'Стандарт', en: 'Standard' },
  intensive: { ru: 'Интенсив', en: 'Intensive' },
}

export function TutorPage() {
  const lang = 'ru' as const
  const [prefill, setPrefill] = useState<FormPrefill | null>(null)

  const directionRef = useRef<HTMLSelectElement>(null)
  const goalRef = useRef<HTMLInputElement>(null)

  const handleApply = useCallback((data: FormPrefill) => {
    setPrefill(data)
  }, [])

  useEffect(() => {
    if (!prefill) return
    if (directionRef.current) directionRef.current.value = prefill.direction
    if (goalRef.current) goalRef.current.value = prefill.goal
  }, [prefill])

  return (
    <section className={styles.page}>
      <TutorHero />

      <Directions lang={lang} onApply={handleApply} />

      <Container>
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
            Leave a request — I'll reply with a short plan and the nearest available time slots.
          </p>

          {prefill && (
            <div className={styles.prefillBanner}>
              <span>
                {lang === 'ru' ? 'Выбранное направление: ' : 'Selected direction: '}
                <strong>{directionLabels[prefill.direction]?.[lang] ?? prefill.direction}</strong>
                {' · '}
                {intensityLabels[prefill.intensity]?.[lang] ?? prefill.intensity}
              </span>
              <button
                type="button"
                className={styles.prefillChange}
                onClick={() => {
                  setPrefill(null)
                  scrollToSection('directions')
                }}
              >
                {lang === 'ru' ? 'Изменить' : 'Change'}
              </button>
            </div>
          )}

          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault()
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
                <select
                  ref={directionRef}
                  className={styles.input}
                  name="direction"
                  defaultValue="math"
                  required
                >
                  <option value="math">Math</option>
                  <option value="informatics">Informatics</option>
                  <option value="programming">Programming</option>
                  <option value="oge">ОГЭ</option>
                  <option value="ege">ЕГЭ</option>
                </select>
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Goal</span>
                <input
                  ref={goalRef}
                  className={styles.input}
                  name="goal"
                  type="text"
                  placeholder="Exam / grades / project"
                />
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
