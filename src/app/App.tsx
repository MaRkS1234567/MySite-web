import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'

export default function App() {
  const getMode = (pathname: string) => {
    if (pathname.startsWith('/tutor')) return 'tutor'
    if (pathname.startsWith('/dev')) return 'dev'
    return 'dev'
  }

  const [mode, setMode] = useState(() => getMode(window.location.pathname))

  useEffect(() => {
    // Data routers expose a subscribe API; keep theme in sync with navigation.
    const unsubscribe = router.subscribe((state) => {
      const next = getMode(state.location.pathname)
      setMode(next)
    })

    // Also set HTML attribute for global CSS if you prefer :root selectors.
    document.documentElement.setAttribute('data-mode', mode)

    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode)
  }, [mode])

  return (
    <div data-mode={mode}>
      <RouterProvider router={router} />
    </div>
  )
}
