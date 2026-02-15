import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from '../layouts/RootLayout'
import { DevPage } from '../pages/DevPage'
import { LandingPage } from '../pages/LandingPage/LandingPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { TutorPage } from '../pages/TutorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // Default route
      { index: true, element: <LandingPage /> },

      // Main pages
      { path: 'tutor', element: <TutorPage /> },
      { path: 'dev', element: <DevPage /> },

      // Fallback
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])