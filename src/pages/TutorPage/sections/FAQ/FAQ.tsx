import { CaretDown, MagnifyingGlass } from '@phosphor-icons/react'
import { useCallback, useId, useMemo, useRef, useState } from 'react'

import { Container } from '../../../../shared/ui/Container'

import type { Lang } from './faq.data'
import { faqItems, infographicText, sectionText } from './faq.data'

import styles from './FAQ.module.scss'

type Props = {
  lang?: Lang
}

export function FAQ({ lang = 'ru' }: Props) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const baseId = useId()

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return faqItems
    const q = search.trim().toLowerCase()
    return faqItems.filter(
      (item) =>
        item.question[lang].toLowerCase().includes(q) ||
        item.answer[lang].toLowerCase().includes(q),
    )
  }, [search, lang])

  const contentRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const setContentRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      contentRefs.current.set(id, el)
    } else {
      contentRefs.current.delete(id)
    }
  }, [])

  return (
    <section id="faq" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>{sectionText.title[lang]}</h2>
          <p className={styles.subtitle}>{sectionText.subtitle[lang]}</p>
        </div>

        <div className={styles.body}>
          <div className={styles.faqColumn}>
            <div className={styles.searchWrap}>
              <MagnifyingGlass size={18} weight="bold" className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder={sectionText.searchPlaceholder[lang]}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className={styles.accordion} role="list">
              {filtered.length === 0 && (
                <p className={styles.noResults}>{sectionText.noResults[lang]}</p>
              )}

              {filtered.map((item) => {
                const isOpen = openId === item.id
                const triggerId = `${baseId}-trigger-${item.id}`
                const panelId = `${baseId}-panel-${item.id}`

                return (
                  <div
                    key={item.id}
                    className={[styles.item, isOpen ? styles.itemOpen : ''].filter(Boolean).join(' ')}
                    role="listitem"
                  >
                    <button
                      id={triggerId}
                      type="button"
                      className={styles.trigger}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          toggle(item.id)
                        }
                      }}
                    >
                      <span className={styles.question}>{item.question[lang]}</span>
                      <CaretDown
                        size={20}
                        weight="bold"
                        className={[styles.icon, isOpen ? styles.iconOpen : ''].filter(Boolean).join(' ')}
                      />
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      className={styles.panelWrap}
                      style={{
                        gridTemplateRows: isOpen ? '1fr' : '0fr',
                      }}
                    >
                      <div
                        className={styles.panelInner}
                        ref={(el) => setContentRef(item.id, el)}
                      >
                        <div className={styles.answer}>
                          {item.answer[lang]}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className={styles.infoColumn} aria-hidden="true">
            {/* Programming infographic — code editor window */}
            <div className={styles.csCard}>
              <div className={styles.csHeader}>
                <div className={styles.csIcon}>
                  <svg viewBox="0 0 110 110" width="20" height="20">
                    <path
                      d="M54.3 2.2C27.2 2.2 29 14 29 14l.03 12.2h25.8v3.7H17.6S2 27.4 2 54.7s13.6 26.3 13.6 26.3h8.1V68.3s-.4-13.6 13.4-13.6h23.1s13-.2 13-12.7V17.6S75.4 2.2 54.3 2.2Zm-12.8 9c2.4 0 4.3 1.9 4.3 4.3 0 2.4-1.9 4.3-4.3 4.3-2.4 0-4.3-1.9-4.3-4.3 0-2.4 1.9-4.3 4.3-4.3Z"
                      fill="currentColor"
                      opacity="0.85"
                    />
                    <path
                      d="M55.7 107.8c27.1 0 25.3-11.8 25.3-11.8L80.97 83.8H55.2v-3.7h37.2S108 82.6 108 55.3s-13.6-26.3-13.6-26.3h-8.1v12.7s.4 13.6-13.4 13.6H49.8s-13 .2-13 12.7v24.4s-2.2 15.4 18.9 15.4Zm12.8-9c-2.4 0-4.3-1.9-4.3-4.3 0-2.4 1.9-4.3 4.3-4.3 2.4 0 4.3 1.9 4.3 4.3 0 2.4-1.9 4.3-4.3 4.3Z"
                      fill="currentColor"
                      opacity="0.55"
                    />
                  </svg>
                </div>
                <span className={styles.csTitle}>{infographicText.csTitle[lang]}</span>
              </div>
            <div className={styles.codeWindow}>
              <div className={styles.codeChrome}>
                <span className={[styles.chromeDot, styles.chromeDotRed].join(' ')} />
                <span className={[styles.chromeDot, styles.chromeDotYellow].join(' ')} />
                <span className={[styles.chromeDot, styles.chromeDotGreen].join(' ')} />
                <span className={styles.chromeTitle}>{infographicText.codeFileName}</span>
              </div>
              <div className={styles.codeBody}>
                <div>
                  <span className={styles.codeComment}>{infographicText.codeComment[lang]}</span>
                </div>
                <br />
                <div>
                  <span className={styles.codeKeyword}>{''}</span>
                  <span className={styles.codeName}>student</span>
                  <span className={styles.codePunctuation}>{' = {'}</span>
                </div>
                <div>
                  {'  '}
                  <span className={styles.codeProperty}>goal</span>
                  {': '}
                  <span className={styles.codeString}>{'"90+ EGE score"'}</span>
                  {','}
                </div>
                <div>
                  {'  '}
                  <span className={styles.codeProperty}>dedication</span>
                  {': '}
                  <span className={styles.codeBool}>true</span>
                  {','}
                </div>
                <div>
                  {'  '}
                  <span className={styles.codeProperty}>mentor</span>
                  {': '}
                  <span className={styles.codeString}>{'"Mark"'}</span>
                </div>
                <div>
                  <span className={styles.codePunctuation}>{'}'}</span>
                </div>
              </div>
              <div className={styles.codeStats}>
                <div className={styles.codeStat}>
                  <div className={styles.codeStatValue}>{infographicText.statStudentsValue}</div>
                  <div className={styles.codeStatLabel}>{infographicText.statStudentsLabel[lang]}</div>
                </div>
                <div className={styles.codeStat}>
                  <div className={styles.codeStatValueAccent}>{infographicText.statSuccessValue}</div>
                  <div className={styles.codeStatLabel}>{infographicText.statSuccessLabel[lang]}</div>
                </div>
              </div>
            </div>
            </div>

            {/* Math infographic */}
            <div className={styles.mathWrapper}>
              <div className={styles.mathHeader}>
                <div className={styles.mathIcon}>∑</div>
                <span className={styles.mathTitle}>{infographicText.mathTitle[lang]}</span>
              </div>
              <div className={styles.mathCard}>
                <div className={styles.mathFormulas}>
                  <div className={styles.mathFormula}>
                    <span className={styles.formulaLabel}>{'f(x)'}</span>
                    <span className={styles.formulaText}>{'= ax² + bx + c'}</span>
                  </div>
                  <div className={styles.mathFormula}>
                    <span className={styles.formulaLabel}>{'S△'}</span>
                    <span className={styles.formulaText}>{'= ½ · a · h'}</span>
                  </div>
                  <div className={styles.mathFormula}>
                    <span className={styles.formulaLabel}>{'lim'}</span>
                    <span className={styles.formulaText}>{'sin(x)/x → 1'}</span>
                  </div>
                </div>
                <div className={styles.mathStats}>
                  <div className={styles.mathStat}>
                    <div className={styles.mathStatValue}>{infographicText.mathStatAvgValue}</div>
                    <div className={styles.mathStatLabel}>{infographicText.mathStatAvgLabel[lang]}</div>
                  </div>
                  <div className={styles.mathStat}>
                    <div className={styles.mathStatValue}>{infographicText.mathStatTopValue}</div>
                    <div className={styles.mathStatLabel}>{infographicText.mathStatTopLabel[lang]}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
