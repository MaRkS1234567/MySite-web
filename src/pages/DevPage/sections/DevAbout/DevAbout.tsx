import { ArrowUpRight } from '@phosphor-icons/react'
import { useEffect, useRef, type ReactNode, type RefObject } from 'react'
import { Link } from 'react-router-dom'

import { Container } from '../../../../shared/ui/Container'
import {
  metrics,
  stackCategories,
  workSteps,
} from './devAbout.data'

import styles from './DevAbout.module.scss'

// ── IntersectionObserver reveal hook ────────────────────────────────────────
// Animate-once: adds .visible class when element enters viewport, then
// disconnects. Respects prefers-reduced-motion.

function useReveal(ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add(styles.visible)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

// ── Reveal wrapper ───────────────────────────────────────────────────────────

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: 0 | 1 | 2 | 3 | 4
}

function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)

  const delayClass = delay > 0 ? styles[`delay${delay}` as keyof typeof styles] : undefined

  return (
    <div
      ref={ref}
      className={[styles.reveal, delayClass, className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  )
}

// ── 1. Hero block ────────────────────────────────────────────────────────────

function HeroBlock() {
  return (
    <Reveal>
      <div className={styles.heroTitleRow}>
        <span className={styles.heroName}>Full-Stack Developer</span>
        <span className={styles.heroSlash}>/</span>
        <span className={styles.heroSubtitle}>Product Engineer</span>
      </div>
    </Reveal>
  )
}

// ── 2. Professional summary ──────────────────────────────────────────────────

function SummaryBlock() {
  return (
    <Reveal>
      <div className={styles.summaryBlock}>
        <h3 className={styles.blockTitle}>Кратко обо мне</h3>
        <p className={styles.summaryBody}>
          Более 4х лет коммерческой разработки. Основной стек: React / TypeScript /
          Node.js / Django / PostgreSQL. Строил SaaS-продукты, аналитические дашборды,
          образовательные платформы и внутренние инструменты для команд.
          Ценю производительность, поддерживаемость кода и решения, которые масштабируются.
        </p>
        <Link to="/cv" className={styles.cvLink}>
          Полное CV
          <ArrowUpRight size={14} weight="bold" />
        </Link>
      </div>
    </Reveal>
  )
}

// ── 3. Technical stack ───────────────────────────────────────────────────────

function StackGrid() {
  return (
    <div className={styles.stackSection}>
      <Reveal>
        <h3 className={styles.blockTitle}>Технический стек</h3>
      </Reveal>

      <div className={styles.stackGrid}>
        {stackCategories.map((cat, i) => (
          <Reveal key={cat.id} delay={(i % 4) as 0 | 1 | 2 | 3}>
            <div className={styles.stackCard}>
              <p className={styles.stackLabel}>{cat.label}</p>
              <div className={styles.chipRow}>
                {cat.items.map((item) => (
                  <span key={item} className={styles.chip}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

// ── 4. Work approach ─────────────────────────────────────────────────────────

function ApproachBlock() {
  return (
    <div className={styles.approachSection}>
      <Reveal>
        <div className={styles.blockHeader}>
          <h3 className={styles.blockTitle}>Подход к работе</h3>
          <p className={styles.blockSubtitle}>Прозрачный процесс от брифа до релиза</p>
        </div>
      </Reveal>

      <div className={styles.timeline}>
        {workSteps.map((step, i) => (
          <Reveal key={step.number} delay={(i % 3) as 0 | 1 | 2}>
            <div className={styles.timelineStep}>
              <div className={styles.stepNumWrap} aria-hidden="true">
                <span className={styles.stepNum}>{String(step.number).padStart(2, '0')}</span>
              </div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

// ── 6. Metrics ───────────────────────────────────────────────────────────────

function MetricsBlock() {
  return (
    <div className={styles.metricsSection}>
      <Reveal>
        <h3 className={styles.blockTitle}>В цифрах</h3>
      </Reveal>

      <div className={styles.metricsGrid}>
        {metrics.map((metric, i) => {
          const delay = (i % 4) as 0 | 1 | 2 | 3

          const card = (
            <div
              className={[styles.metricCard, metric.href ? styles.metricCardLink : '']
                .filter(Boolean)
                .join(' ')}
            >
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricLabel}>{metric.label}</span>
              {metric.href && (
                <ArrowUpRight
                  size={14}
                  weight="bold"
                  className={styles.metricArrow}
                  aria-hidden="true"
                />
              )}
            </div>
          )

          return (
            <Reveal key={metric.id} delay={delay}>
              {metric.href ? (
                <Link to={metric.href} className={styles.metricLinkWrapper}>
                  {card}
                </Link>
              ) : (
                card
              )}
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}

// ── Root export ──────────────────────────────────────────────────────────────

export function DevAbout() {
  return (
    <section id="about" className={styles.section} aria-label="О себе">
      <Container>
        <div className={styles.inner}>
        <HeroBlock />
        <SummaryBlock />
        <StackGrid />
        <ApproachBlock />
        <MetricsBlock />
        </div>
      </Container>
    </section>
  )
}
