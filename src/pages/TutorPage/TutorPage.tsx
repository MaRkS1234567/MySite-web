import { useCallback, useEffect, useState } from 'react'

import { scrollToSection } from '../../shared/lib/scrollToSection'
import { Button } from '../../shared/ui/Button'
import { Container } from '../../shared/ui/Container'
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

          <div className={styles.applyContent}>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault()
                alert('Request sent! (demo)')
              }}
            >
              {prefill ? (
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
              ) : (
                <a
                  href="#directions"
                  className={styles.directionsHint}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('directions')
                  }}
                >
                  <span className={styles.directionsHintText}>
                    {lang === 'ru' ? 'Выберите направление в разделе выше' : 'Select a direction in the section above'}
                  </span>
                  <span className={styles.directionsHintArrow}>→</span>
                </a>
              )}

              <div className={styles.formGrid}>
                <input className={styles.input} name="name" type="text" placeholder="Name" required />

                <input
                  className={styles.input}
                  name="contact"
                  type="text"
                  placeholder="Contact (Telegram / phone)"
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

            <div className={styles.infoGraphic}>
              <h3 className={styles.infoGraphicTitle}>How it works</h3>
              <div className={styles.steps}>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>01</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Trial Session</h4>
                    <p className={styles.stepDescription}>
                      Get to know each other, discuss your goals and current level
                    </p>
                  </div>
                </div>

                <div className={styles.stepConnector} />

                <div className={styles.step}>
                  <div className={styles.stepNumber}>02</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Learning Plan</h4>
                    <p className={styles.stepDescription}>
                      I'll create a personalized roadmap based on your needs
                    </p>
                  </div>
                </div>

                <div className={styles.stepConnector} />

                <div className={styles.step}>
                  <div className={styles.stepNumber}>03</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Start Learning</h4>
                    <p className={styles.stepDescription}>
                      We agree on a schedule and begin our journey together
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </section>
  )
}
