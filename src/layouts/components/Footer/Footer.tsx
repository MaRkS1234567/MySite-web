import { Container } from '../../../shared/ui/Container'
import { Phone, TelegramLogo } from '@phosphor-icons/react'
import styles from './Footer.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <span>© {new Date().getFullYear()} Mark Sharapov</span>
        </div>
      </Container>

      <div className={styles.mobileContacts}>
        <h3 className={styles.mobileContactsTitle}>My Contacts</h3>
        <div className={styles.mobileContactsList}>
          <a href="tel:+79991234567" className={styles.mobileContactItem}>
            <Phone size={20} weight="regular" />
            <span>+7 (999) 123-45-67</span>
          </a>
          <a href="https://t.me/yourusername" className={styles.mobileContactItem} target="_blank" rel="noopener noreferrer">
            <TelegramLogo size={20} weight="regular" />
            <span>@yourusername</span>
          </a>
        </div>
      </div>
    </footer>
  )
}