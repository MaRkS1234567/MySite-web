import { ArrowUpRight } from '@phosphor-icons/react'
import styles from './Reviews.module.scss'

import reviewImage1 from '../../../../assets/images/reviews/1.jpeg'
import reviewImage2 from '../../../../assets/images/reviews/2.jpeg'
import reviewImage3 from '../../../../assets/images/reviews/3.jpeg'
import reviewImage4 from '../../../../assets/images/reviews/4.jpeg'
import reviewImage5 from '../../../../assets/images/reviews/5.jpeg'
import reviewImage6 from '../../../../assets/images/reviews/6.jpeg'

type Lang = 'ru' | 'en'

type Review = {
  id: string
  subject: { ru: string; en: string }
  duration: { ru: string; en: string }
  reviewUrl?: string
  image?: string
}

const reviewImages: Record<string, string> = {
  '1': reviewImage1,
  '2': reviewImage2,
  '3': reviewImage3,
  '4': reviewImage4,
  '5': reviewImage5,
  '6': reviewImage6,
}

const reviews: Review[] = [
  {
    id: '1',
    subject: { ru: 'ЕГЭ информатика', en: 'EGE Informatics' },
    duration: { ru: '6 месяца до экзамена', en: '6 months until exam' },
    reviewUrl: 'https://profi.ru/profile/SharapovMA13/?utm_medium=share_profile&af_ad_type=share_profile&pid=app&utm_campaign=SharapovMA13&c=SharapovMA13',
    image: reviewImages['1'],
  },
  {
    id: '2',
    subject: { ru: 'ЕГЭ информатика', en: 'EGE Informatics' },
    duration: { ru: '9 месяцев занятий', en: '9 months of study' },
    reviewUrl: 'https://profi.ru/profile/SharapovMA13/?utm_medium=share_profile&af_ad_type=share_profile&pid=app&utm_campaign=SharapovMA13&c=SharapovMA13',
    image: reviewImages['2'],
  },
  {
    id: '3',
    subject: { ru: 'ЕГЭ информатика', en: 'EGE Informatics' },
    duration: { ru: '3 месяца подготовки', en: '3 months of preparation' },
    reviewUrl: 'https://profi.ru/profile/SharapovMA13/?utm_medium=share_profile&af_ad_type=share_profile&pid=app&utm_campaign=SharapovMA13&c=SharapovMA13',
    image: reviewImages['3'],
  },
  {
    id: '4',
    subject: { ru: 'Математика', en: 'Mathematics' },
    duration: { ru: '3 месяца занятий', en: '3 months of study' },
    reviewUrl: 'https://profi.ru/profile/SharapovMA13/?utm_medium=share_profile&af_ad_type=share_profile&pid=app&utm_campaign=SharapovMA13&c=SharapovMA13',
    image: reviewImages['4'],
  },
  {
    id: '5',
    subject: { ru: 'Программирование', en: 'Programming' },
    duration: { ru: '7 месяца занятий', en: '7 months of study' },
    reviewUrl: 'https://profi.ru/profile/SharapovMA13/?utm_medium=share_profile&af_ad_type=share_profile&pid=app&utm_campaign=SharapovMA13&c=SharapovMA13',
    image: reviewImages['5'],
  },
  {
    id: '6',
    subject: { ru: 'ЕГЭ математика', en: 'EGE Mathematics' },
    duration: { ru: '2 месяца подготовки', en: '2 months of preparation' },
    reviewUrl: 'https://profi.ru/profile/SharapovMA13/?utm_medium=share_profile&af_ad_type=share_profile&pid=app&utm_campaign=SharapovMA13&c=SharapovMA13',
    image: reviewImages['6'],
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
    viewReview: { ru: 'Смотреть отзывы', en: 'View reviews' },
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
              {review.image ? (
                <img
                  src={review.image}
                  alt={`Review ${review.id}`}
                  className={styles.reviewImage}
                  loading="lazy"
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  {/* Placeholder for student screenshot */}
                </div>
              )}

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
