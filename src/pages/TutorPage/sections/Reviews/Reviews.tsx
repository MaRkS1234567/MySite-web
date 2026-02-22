import { ArrowUpRight } from '@phosphor-icons/react'
import styles from './Reviews.module.scss'

type Lang = 'ru' | 'en'

type Review = {
  id: string
  subject: { ru: string; en: string }
  duration: { ru: string; en: string }
  reviewUrl?: string
}

const reviews: Review[] = [
  {
    id: '1',
    subject: { ru: 'Математика', en: 'Mathematics' },
    duration: { ru: '3 месяца до экзамена', en: '3 months until exam' },
    reviewUrl: '#',
  },
  {
    id: '2',
    subject: { ru: 'Программирование', en: 'Programming' },
    duration: { ru: '6 месяцев занятий', en: '6 months of study' },
    reviewUrl: '#',
  },
  {
    id: '3',
    subject: { ru: 'ОГЭ', en: 'OGE' },
    duration: { ru: '4 месяца подготовки', en: '4 months of preparation' },
    reviewUrl: '#',
  },
  {
    id: '4',
    subject: { ru: 'ЕГЭ', en: 'EGE' },
    duration: { ru: '5 месяцев до экзамена', en: '5 months until exam' },
    reviewUrl: '#',
  },
  {
    id: '5',
    subject: { ru: 'Математика', en: 'Mathematics' },
    duration: { ru: '2 месяца занятий', en: '2 months of study' },
    reviewUrl: '#',
  },
  {
    id: '6',
    subject: { ru: 'Программирование', en: 'Programming' },
    duration: { ru: '4 месяца подготовки', en: '4 months of preparation' },
    reviewUrl: '#',
  },
]

type Props = {
  lang?: Lang
}

export function Reviews({ lang = 'ru' }: Props) {
  const sectionText = {
    title: { ru: 'Отзывы', en: 'Reviews' },
    subtitle: {
      ru: 'Отзывы и впечатления от реальных учеников',
      en: 'Reviews and impressions from real students',
    },
    viewReview: { ru: 'Смотреть отзыв', en: 'View review' },
  }

  return (
    <section id="reviews" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{sectionText.title[lang]}</h2>
          <p className={styles.subtitle}>{sectionText.subtitle[lang]}</p>
        </div>

        <div className={styles.grid}>
          {reviews.map((review) => (
            <article key={review.id} className={styles.card}>
              <div className={styles.imagePlaceholder}>
                {/* Placeholder for student screenshot */}
              </div>

              <div className={styles.info}>
                <div className={styles.details}>
                  <span className={styles.subject}>{review.subject[lang]}</span>
                  <span className={styles.divider}>•</span>
                  <span className={styles.duration}>{review.duration[lang]}</span>
                </div>

                {review.reviewUrl && (
                  <a
                    href={review.reviewUrl}
                    className={styles.reviewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{sectionText.viewReview[lang]}</span>
                    <ArrowUpRight size={14} weight="bold" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
