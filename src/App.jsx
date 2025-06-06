// ── src/App.jsx ──
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; 
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoverageGrid from './components/CoverageGrid';
import Reviews from './components/Reviews';

// 1) Create a theme that uses Poppins everywhere:
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    // You can also adjust default font weights if you like:
    // fontWeightLight: 300,
    // fontWeightRegular: 400,
    // fontWeightMedium: 500,
    // fontWeightBold: 600,
  },
  palette: {
    // Keep your color palette as is. For example:
    primary: {
      main: '#00A99B',
    },
    secondary: {
      main: '#333333', // this is used for the “Get a Quote” button on Hero
    },
    text: {
      primary: '#FFFFFF', // default text on dark backgrounds
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline makes sure things like margins, font rendering, and default backgrounds are normalized. */}
      <CssBaseline />

      <Navbar />
      <Hero />
      <CoverageGrid />
      <Reviews />
      {/* Later, you’ll add other sections (CoverageGrid, WhyUs, etc.) but they will automatically inherit Poppins */}
    </ThemeProvider>
  );
}
