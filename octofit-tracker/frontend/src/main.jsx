import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

console.info('OctoFit frontend loaded. Set VITE_CODESPACE_NAME in .env.local for Codespaces URLs.');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
