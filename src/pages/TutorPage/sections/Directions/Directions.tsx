import { useState, useCallback } from 'react'
import { CaretDown, CheckCircle } from '@phosphor-icons/react'

import { Button } from '../../../../shared/ui/Button'
import { Container } from '../../../../shared/ui/Container'
import { scrollToSection } from '../../../../shared/lib/scrollToSection'

import {
  directions,
  intensityLabels,
  intensityOptions,
  sectionText,
} from './directions.data'
import type { DirectionId, Intensity, Direction } from './directions.data'

import styles from './Directions.module.scss'

export type FormPrefill = {
  direction: DirectionId
  goal: string
  intensity: Intensity
}

type Lang = 'ru' | 'en'

type Props = {
  lang?: Lang
  onApply?: (prefill: FormPrefill) => void
}

function trackEvent(name: string, data?: Record<string, string>) {
  if (import.meta.env.DEV) console.debug(`[analytics] ${name}`, data)
}

type CardProps = {
  dir: Direction
  lang: Lang
  expanded: boolean
  intensity: Intensity
  onToggle: () => void
  onIntensityChange: (intensity: Intensity) => void
  onApply: () => void
}

function DirectionCard({
  dir,
  lang,
  expanded,
  intensity,
  onToggle,
  onIntensityChange,
  onApply,
}: CardProps) {
  const Icon = dir.icon

  return (
    <article
      className={[styles.card, expanded ? styles.cardExpanded : ''].filter(Boolean).join(' ')}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>
          <Icon size={28} weight="duotone" />
        </div>
        <div className={styles.cardTitleGroup}>
          <h3 className={styles.cardTitle}>{dir.title[lang]}</h3>
          <p className={styles.cardPromise}>{dir.promise[lang]}</p>
        </div>
        <div className={[styles.chevron, expanded ? styles.chevronOpen : ''].filter(Boolean).join(' ')}>
          <CaretDown size={20} weight="bold" />
        </div>
      </div>

      <p className={styles.cardAudience}>
        {sectionText.audienceLabel[lang]}: {dir.audience[lang]}
      </p>

      <div className={[styles.expandable, expanded ? styles.expandableOpen : ''].filter(Boolean).join(' ')}>
        <div className={styles.expandableInner}>
          <div className={styles.expandableContent}>
            <p className={styles.subLabel}>{sectionText.insideLabel[lang]}</p>
            <ul className={styles.bullets}>
              {dir.bullets[lang].map((b) => (
                <li key={b} className={styles.bullet}>
                  <CheckCircle size={16} weight="fill" className={styles.bulletIcon} />
                  {b}
                </li>
              ))}
            </ul>

            <div className={styles.tags}>
              {dir.tags[lang].map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>

            <div className={styles.intensityBlock}>
              <p className={styles.subLabel}>{sectionText.intensityLabel[lang]}</p>
              <div className={styles.intensityPills}>
                {intensityOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={[
                      styles.intensityPill,
                      intensity === opt ? styles.intensityPillActive : '',
                    ].filter(Boolean).join(' ')}
                    onClick={(e) => {
                      e.stopPropagation()
                      onIntensityChange(opt)
                      trackEvent('direction_intensity_changed', {
                        direction: dir.id,
                        intensity: opt,
                      })
                    }}
                  >
                    {intensityLabels[opt][lang]}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.cardActions}>
              <Button
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation()
                  onApply()
                }}
              >
                {sectionText.cta[lang]}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Directions({ lang = 'ru', onApply }: Props) {
  const [expandedId, setExpandedId] = useState<DirectionId | null>(null)
  const [intensities, setIntensities] = useState<Record<DirectionId, Intensity>>({
    oge: 'standard',
    ege: 'standard',
    programming: 'standard',
    math: 'standard',
  })

  const handleToggle = useCallback((id: DirectionId) => {
    setExpandedId((prev) => {
      const next = prev === id ? null : id
      if (next) trackEvent('direction_selected', { direction: id })
      return next
    })
  }, [])

  const handleIntensityChange = useCallback((id: DirectionId, intensity: Intensity) => {
    setIntensities((prev) => ({ ...prev, [id]: intensity }))
  }, [])

  const handleApply = useCallback(
    (dir: Direction) => {
      const prefill: FormPrefill = {
        direction: dir.id,
        goal: dir.goal[lang],
        intensity: intensities[dir.id],
      }
      trackEvent('direction_apply_clicked', {
        direction: dir.id,
        intensity: intensities[dir.id],
      })
      onApply?.(prefill)
      scrollToSection('apply')
    },
    [lang, intensities, onApply],
  )

  return (
    <section id="directions" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>{sectionText.title[lang]}</h2>
          <p className={styles.subtitle}>{sectionText.subtitle[lang]}</p>
        </div>

        <div className={styles.grid}>
          {directions.map((dir) => (
            <DirectionCard
              key={dir.id}
              dir={dir}
              lang={lang}
              expanded={expandedId === dir.id}
              intensity={intensities[dir.id]}
              onToggle={() => handleToggle(dir.id)}
              onIntensityChange={(i) => handleIntensityChange(dir.id, i)}
              onApply={() => handleApply(dir)}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
