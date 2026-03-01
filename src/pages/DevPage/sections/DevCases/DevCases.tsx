import { useState, useEffect, useRef, type ReactNode, type RefObject } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, X, GithubLogo, Globe } from '@phosphor-icons/react'

import { Container } from '../../../../shared/ui/Container'
import { cases, FILTERS, type CaseItem, type CaseStatus } from './devCases.data'

import styles from './DevCases.module.scss'

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
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' },
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

// ── Case card ─────────────────────────────────────────────────────────────────

type CaseCardProps = {
  item: CaseItem
  isActive: boolean
  delay: 0 | 1 | 2 | 3
  onSelect: (id: string | null) => void
}

function CaseCard({ item, isActive, delay, onSelect }: CaseCardProps) {
  return (
    <Reveal delay={delay}>
      <article
        className={[styles.card, isActive ? styles.cardActive : ''].filter(Boolean).join(' ')}
        aria-label={item.title}
      >
        {(item.github || item.demo) && (
          <div className={styles.cardHead}>
            <div className={styles.cardLinks}>
              {item.github && (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.iconLink}
                  aria-label={`${item.title} GitHub`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <GithubLogo size={16} weight="bold" />
                </a>
              )}
              {item.demo && (
                <a
                  href={item.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.iconLink}
                  aria-label={`${item.title} — живое демо`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Globe size={16} weight="bold" />
                </a>
              )}
            </div>
          </div>
        )}

        <h3 className={styles.cardTitle}>
          <a
            href="#"
            className={styles.titleLink}
            onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
          >
            {item.title}
            <ArrowUpRight className={styles.titleArrow} size={14} weight="bold" aria-hidden="true" />
          </a>
        </h3>
        <p className={styles.cardSubtitle}>{item.subtitle}</p>

        <div className={styles.cardImage}>
          {item.images?.[0] ? (
            <img src={item.images[0]} alt={item.title} className={styles.cardImg} />
          ) : (
            <div className={styles.cardImagePlaceholder} aria-hidden="true" />
          )}
        </div>

        <div className={styles.cardMetric}>
          <span className={styles.metricDot} aria-hidden="true" />
          <span>{item.metric}</span>
        </div>

        <button
          className={[styles.viewBtn, isActive ? styles.viewBtnActive : '']
            .filter(Boolean)
            .join(' ')}
          onClick={() => onSelect(isActive ? null : item.id)}
          aria-expanded={isActive}
          aria-controls={`case-detail-${item.id}`}
        >
          {isActive ? (
            <>
              Закрыть
              <X size={14} weight="bold" aria-hidden="true" />
            </>
          ) : (
            <>
              Открыть кейс
              <ArrowRight size={14} weight="bold" aria-hidden="true" />
            </>
          )}
        </button>
      </article>
    </Reveal>
  )
}

// ── Case detail ───────────────────────────────────────────────────────────────

type ViewMode = 'business' | 'arch'

type CaseDetailProps = {
  item: CaseItem
  onClose: () => void
}

function CaseDetail({ item, onClose }: CaseDetailProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('business')
  const [imgIndex, setImgIndex] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const images = item.images ?? []

  function handlePrev() {
    if (images.length < 2) return
    setImgIndex((i) => (i - 1 + images.length) % images.length)
  }

  function handleNext() {
    if (images.length < 2) return
    setImgIndex((i) => (i + 1) % images.length)
  }

  // Scroll panel into view when it mounts (key-based reset handles viewMode)
  useEffect(() => {
    const t = requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(t)
  }, [])

  return (
    <div
      id={`case-detail-${item.id}`}
      ref={panelRef}
      className={styles.detail}
      role="region"
      aria-label={`Детали кейса: ${item.title}`}
    >
      {/* Detail header */}
      <div className={styles.detailHeader}>
        <div className={styles.detailTitleGroup}>
          <span className={styles.detailCategory}>{item.category}</span>
          <h3 className={styles.detailTitle}>
            <a
              href="#"
              className={styles.titleLink}
              onClick={(e) => e.preventDefault()}
            >
              {item.title}
              <ArrowUpRight className={styles.titleArrow} size={16} weight="bold" aria-hidden="true" />
            </a>
          </h3>
          <p className={styles.detailSubtitle}>{item.subtitle}</p>
        </div>

        <div className={styles.detailActions}>
          {/* View mode toggle */}
          <div className={styles.toggleGroup} role="group" aria-label="Режим просмотра">
            <button
              className={[styles.toggleBtn, viewMode === 'business' ? styles.toggleBtnActive : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => setViewMode('business')}
              aria-pressed={viewMode === 'business'}
            >
              Продукт
            </button>
            <button
              className={[styles.toggleBtn, viewMode === 'arch' ? styles.toggleBtnActive : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => setViewMode('arch')}
              aria-pressed={viewMode === 'arch'}
            >
              Архитектура
            </button>
          </div>

          {/* External links */}
          <div className={styles.detailLinks}>
            {item.github && (
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.detailLink}
              >
                <GithubLogo size={15} weight="bold" aria-hidden="true" />
                GitHub
              </a>
            )}
            {item.demo && (
              <a
                href={item.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.detailLink}
              >
                <Globe size={15} weight="bold" aria-hidden="true" />
                Demo
                <ArrowUpRight size={12} weight="bold" aria-hidden="true" />
              </a>
            )}
          </div>

          <button className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">
            <X size={18} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Business view */}
      {viewMode === 'business' && (
        <div className={styles.detailBody}>
          {/* О проекте + Проблема (merged) */}
          <div className={styles.detailBlock}>
            <h4 className={styles.blockLabel}>О проекте</h4>
            <p className={styles.blockText}>{item.overview}</p>
            <p className={styles.blockText}>{item.problem}</p>
          </div>

          {/* Photo carousel */}
          <div className={styles.detailCarousel}>
            <button
              className={styles.carouselArrow}
              onClick={handlePrev}
              disabled={images.length < 2}
              aria-label="Предыдущее фото"
            >
              <ArrowLeft size={16} weight="bold" aria-hidden="true" />
            </button>
            <div className={styles.carouselFrame}>
              {images.length > 0 ? (
                <img
                  src={images[imgIndex]}
                  alt={`${item.title} — фото ${imgIndex + 1}`}
                  className={styles.carouselImg}
                />
              ) : (
                <div className={styles.carouselPlaceholder} aria-hidden="true" />
              )}
            </div>
            <button
              className={styles.carouselArrow}
              onClick={handleNext}
              disabled={images.length < 2}
              aria-label="Следующее фото"
            >
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </button>
          </div>

          {images.length > 1 && (
            <div className={styles.carouselDots}>
              {images.map((_, i) => (
                <button
                  key={i}
                  className={[styles.carouselDot, i === imgIndex ? styles.carouselDotActive : '']
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setImgIndex(i)}
                  aria-label={`Фото ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Решение + Результаты (merged) */}
          <div className={styles.detailBlock}>
            <h4 className={styles.blockLabel}>Решение и результат</h4>
            <p className={styles.blockText}>{item.solution}</p>
            <ul className={styles.resultList}>
              {item.results.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Architecture view */}
      {viewMode === 'arch' && (
        <div className={styles.detailBody}>
          {/* Stack breakdown */}
          <div className={styles.detailBlock}>
            <h4 className={styles.blockLabel}>Стек</h4>
            <div className={styles.stackTable}>
              {Object.entries(item.stack)
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className={styles.stackRow}>
                    <span className={styles.stackKey}>{capitalize(k)}</span>
                    <span className={styles.stackVal}>{v}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Architecture decisions */}
          <div className={styles.detailBlock}>
            <h4 className={styles.blockLabel}>Архитектурные решения</h4>
            <ul className={styles.archList}>
              {item.architectureNotes.map((note) => (
                <li key={note} className={styles.archItem}>
                  <span className={styles.archDash} aria-hidden="true">—</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Helper ─────────────────────────────────────────────────────────────────────

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// ── Root export ───────────────────────────────────────────────────────────────

export function DevCases() {
  const [activeFilter, setActiveFilter] = useState<'all' | CaseStatus>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredCases =
    activeFilter === 'all' ? cases : cases.filter((c) => c.status === activeFilter)

  const expandedCase = cases.find((c) => c.id === expandedId) ?? null

  function handleFilterChange(f: 'all' | CaseStatus) {
    setActiveFilter(f)
    setExpandedId(null)
  }

  return (
    <section id="cases" className={styles.section} aria-label="Кейсы">
      <Container>
        {/* Header */}
        <Reveal>
          <div className={styles.header}>
            <h2 className={styles.heading}>Кейсы</h2>
            <p className={styles.subheading}>
              Реальные продукты. Реальные архитектурные решения. Реальный результат.
            </p>
          </div>
        </Reveal>

        {/* Filter bar */}
        <Reveal>
          <div className={styles.filterBar} role="group" aria-label="Фильтр кейсов по статусу">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={[styles.filterBtn, activeFilter === f.value ? styles.filterBtnActive : '']
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handleFilterChange(f.value)}
                aria-pressed={activeFilter === f.value}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Cards grid */}
        <div className={styles.grid}>
          {filteredCases.map((item, i) => (
            <CaseCard
              key={item.id}
              item={item}
              isActive={item.id === expandedId}
              delay={(i % 3) as 0 | 1 | 2 | 3}
              onSelect={(id) => setExpandedId(id)}
            />
          ))}
        </div>

        {/* Expanded detail panel — key resets CaseDetail state on case change */}
        {expandedCase && (
          <CaseDetail
            key={expandedCase.id}
            item={expandedCase}
            onClose={() => setExpandedId(null)}
          />
        )}

        {/* Bottom CTA */}
        <Reveal>
          <div className={styles.ctaRow}>
            <a href="#contacts" className={styles.cta}>
              Есть идея проекта?
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
