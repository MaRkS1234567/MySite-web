import { useEffect, useRef, type ReactNode, type RefObject } from 'react'
import { ArrowRight } from '@phosphor-icons/react'

import { Container } from '../../../../shared/ui/Container'
import { services } from './devServices.data'

import styles from './DevServices.module.scss'

// ── Reveal hook ───────────────────────────────────────────────────────────────

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

// ── Reveal wrapper ────────────────────────────────────────────────────────────

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: 0 | 1 | 2 | 3
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

// ── Root export ───────────────────────────────────────────────────────────────

export function DevServices() {
  return (
    <section id="services" className={styles.section} aria-label="Услуги">
      <Container>
        <Reveal>
          <h2 className={styles.heading}>Услуги</h2>
        </Reveal>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <Reveal key={service.id} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.description}</p>
                <span className={styles.cardMeta}>{service.meta}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className={styles.ctaRow}>
            <a href="#contacts" className={styles.cta}>
              Обсудить проект
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
