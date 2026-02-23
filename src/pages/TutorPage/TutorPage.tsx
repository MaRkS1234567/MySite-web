import { useCallback, useState } from 'react'

import { scrollToSection } from '../../shared/lib/scrollToSection'
import { Button } from '../../shared/ui/Button'
import { Container } from '../../shared/ui/Container'
import { Directions } from './sections/Directions'
import { Pricing } from './sections/Pricing'
import { FAQ } from './sections/FAQ'
import { Reviews } from './sections/Reviews/Reviews'
import { TutorHero } from './sections/TutorHero/TutorHero'

import type { PricingConfig } from './sections/Pricing'
import type { DirectionId, Intensity } from './sections/Directions/directions.data'

import { formatPricingSummary } from './sections/Pricing/pricing.data'

import styles from './TutorPage.module.scss'

export function TutorPage() {
  const lang = 'ru' as const
  const [pricingConfig, setPricingConfig] = useState<PricingConfig | null>(null)
  const [selectedDirection, setSelectedDirection] = useState<{ direction: DirectionId; intensity: Intensity } | null>(null)

  const handlePricingApply = useCallback((config: PricingConfig) => {
    setPricingConfig(config)
  }, [])

  const handleDirectionSelect = useCallback((direction: DirectionId, intensity: Intensity) => {
    setSelectedDirection({ direction, intensity })
  }, [])

  return (
    <section className={styles.page}>
      <TutorHero />

      <Directions lang={lang} onDirectionSelect={handleDirectionSelect} />

      <Pricing
        lang={lang}
        onApply={handlePricingApply}
        initialGoal={selectedDirection?.direction}
        initialIntensity={selectedDirection?.intensity}
      />

      <Container>
        <Reviews lang={lang} />
      </Container>

      <FAQ lang={lang} />

      <Container>
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
              {pricingConfig && (
                <div className={styles.prefillBanner}>
                  <span>
                    {lang === 'ru' ? 'Параметры: ' : 'Pricing: '}
                    <strong>{formatPricingSummary(pricingConfig, lang)}</strong>
                  </span>
                  <button
                    type="button"
                    className={styles.prefillChange}
                    onClick={() => {
                      setPricingConfig(null)
                      scrollToSection('pricing')
                    }}
                  >
                    {lang === 'ru' ? 'Изменить' : 'Change'}
                  </button>
                </div>
              )}

              {!pricingConfig && (
                <a
                  href="#pricing"
                  className={styles.directionsHint}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('pricing')
                  }}
                >
                  <span className={styles.directionsHintText}>
                    {lang === 'ru' ? 'Выберите формат обучения в разделе Pricing' : 'Select a format in the Pricing section'}
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
