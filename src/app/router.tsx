import { createBrowserRouter, Navigate } from 'react-router-dom'

import { RootLayout } from '../layouts/RootLayout'
import { DevPage } from '../pages/DevPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { TutorPage } from '../pages/TutorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // Redirect root to tutor page
      { index: true, element: <Navigate to="/tutor" replace /> },

      // Main pages
      { path: 'tutor', element: <TutorPage /> },
      { path: 'dev', element: <DevPage /> },

      // Fallback
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])