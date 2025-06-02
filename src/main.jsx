// ── src/main.jsx ──
import React from 'react';
import { createRoot } from 'react-dom/client';

// 1️⃣ Import MUI’s ThemeProvider, createTheme, and CssBaseline
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import App from './App.jsx';
import './styles/index.css'; // Keep your global CSS

// 2️⃣ Create a custom theme (feel free to tweak colors/fonts)
const theme = createTheme({
  palette: {
    primary: {
      main: '#00A99B',      // your “brand” teal
    },
    secondary: {
      main: '#4F4F4F',      // your slate gray
    },
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3️⃣ Wrap the app in MUI’s ThemeProvider */}
    <ThemeProvider theme={theme}>
      {/* CssBaseline kicks in a consistent, opinionated set of resets */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
