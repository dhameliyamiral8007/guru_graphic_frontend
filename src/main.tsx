import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router'

const router = getRouter()
const queryClient = router.options.context.queryClient

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
