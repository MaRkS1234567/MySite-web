import { useCallback, useEffect, useState } from 'react'

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

  const handleApply = useCallback((data: FormPrefill) => {
    setPrefill(data)
  }, [])

  useEffect(() => {
    if (!prefill) return
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

        <section id="apply" className={styles.applySection}>
          <div className={styles.applyHeader}>
            <h2 className={styles.applyTitle}>Apply</h2>
            <p className={styles.applySubtitle}>
              Leave a request — I'll reply with a short plan and the nearest available time slots.
            </p>
          </div>

          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault()
              alert('Request sent! (demo)')
            }}
          >
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

            <div className={styles.formGrid}>
              <input className={styles.input} name="name" type="text" placeholder="Name" required />

              <input
                className={styles.input}
                name="contact"
                type="text"
                placeholder="Contact (Telegram / phone / email)"
                required
              />
            </div>

            <textarea
              className={styles.textarea}
              name="details"
              rows={5}
              placeholder="Student situation / additional info — current level, what is difficult, deadline, preferred format, anything important…"
              required
            />

            <div className={styles.formActions}>
              <Button variant="primary" type="submit">
                Send
              </Button>
            </div>
          </form>
        </section>
      </Container>
    </section>
  )
}
