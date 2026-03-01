import { DevHero } from './sections/DevHero/DevHero'
import { DevAbout } from './sections/DevAbout'
import { DevServices } from './sections/DevServices'
import { DevCases } from './sections/DevCases'
import { DevContact } from './sections/DevContact'

import styles from './DevPage.module.scss'

export function DevPage() {
  return (
    <section className={styles.page}>
      <DevHero />

      <DevAbout />

      <DevServices />

      <DevCases />

      <DevContact />
    </section>
  )
}
