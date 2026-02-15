import { Container } from '../../../shared/ui/Container'
import styles from './Footer.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <span>© {new Date().getFullYear()} Mark Sharapov</span>
        </div>
      </Container>
    </footer>
  )
}