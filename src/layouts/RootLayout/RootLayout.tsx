

import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
// import Snowfall from 'react-snowfall'
import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'
import styles from './RootLayout.module.scss'

export function RootLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isCV = pathname === '/cv'

  return (
    <div className={styles.root}>
      {/* <Snowfall
        color="#fff"
        snowflakeCount={100}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      /> */}
      <ScrollRestoration />
      {!isHome && <Header />}
      <main className={styles.main}>
        <Outlet />
      </main>
      {!isHome && !isCV && <Footer />}
    </div>
  )
}