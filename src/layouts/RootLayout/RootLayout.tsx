

import { Outlet } from 'react-router-dom'

import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'
import styles from './RootLayout.module.scss'

export function RootLayout() {
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}