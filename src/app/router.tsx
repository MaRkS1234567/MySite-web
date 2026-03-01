import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from '../layouts/RootLayout'
import { CvPage } from '../pages/CvPage'
import { DevPage } from '../pages/DevPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { TutorPage } from '../pages/TutorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // Home page (no header)
      { index: true, element: <HomePage /> },

      // Main pages
      { path: 'tutor', element: <TutorPage /> },
      { path: 'dev', element: <DevPage /> },
      { path: 'cv', element: <CvPage /> },

      // Fallback
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
