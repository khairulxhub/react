import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Button.css'
import Count from './counter.tsx'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
   
   <Count />
   
  </StrictMode>,
)
