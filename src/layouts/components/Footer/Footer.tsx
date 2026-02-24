import { Phone, TelegramLogo } from '@phosphor-icons/react'
import styles from './Footer.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.desktopInner}>
        <div className={styles.desktopLeft}>
          <span className={styles.desktopPhone}>
            <Phone size={18} weight="regular" />
            <span>+7 (916) 817-76-33</span>
          </span>
        </div>
        <div className={styles.desktopCenter}>
          <span>© {new Date().getFullYear()} Mark Sharapov</span>
        </div>
        <div className={styles.desktopRight}>
          <a href="https://t.me/marksharapov" className={styles.desktopContactLink} target="_blank" rel="noopener noreferrer">
            <TelegramLogo size={18} weight="regular" />
            <span>@marksharapov</span>
          </a>
        </div>
      </div>

      <div className={styles.mobileContactsWrapper}>
        <h3 className={styles.mobileContactsTitle}>Мои контакты</h3>
        <div className={styles.mobileContactsList}>
          <a href="tel:+79168177633" className={styles.mobileContactItem}>
            <Phone size={20} weight="regular" />
            <span>+7 (916) 817-76-33</span>
          </a>
          <a href="https://t.me/marksharapov" className={styles.mobileContactItem} target="_blank" rel="noopener noreferrer">
            <TelegramLogo size={20} weight="regular" />
            <span>@marksharapov</span>
          </a>
        </div>
      </div>
    </footer>
  )
}