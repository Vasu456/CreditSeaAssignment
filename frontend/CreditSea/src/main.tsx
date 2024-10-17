import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './Router.tsx';
import './index.css'; // Tailwind CSS styles

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
