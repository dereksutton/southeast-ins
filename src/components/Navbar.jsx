// ── src/components/Navbar.jsx ──
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useScrollTrigger,
  Slide,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '/img/southeast-logo.png'; // ← Make sure this matches your public/img path

// ─────────────────────────────────────────────────────────────────────────────
// HideOnScroll: hides the AppBar when scrolling down past 50px
// ─────────────────────────────────────────────────────────────────────────────
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({ threshold: 50 });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

// ─────────────────────────────────────────────────────────────────────────────
// Navbar Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  // ── Define your nav links here. “Get a Quote” gets special button styling.
  const navLinks = [
    { label: 'Coverage', href: '#coverage' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Get a Quote', href: '#quote', isButton: true },
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // Drawer contents (mobile)
  // ─────────────────────────────────────────────────────────────────────────────
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        width: 240,
        height: '100%',
        backgroundColor: '#333333', // dark background for contrast
        color: '#ffffff',
        pt: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* ── Drawer Logo (centered, narrower to prevent overflow) ── */}
      <Box sx={{ mb: 3 }}>
        <Box
          component="img"
          src={logo}
          alt="Southeast Insurance"
          sx={{
            height: 60,
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </Box>

      {/* ── List of Links ── */}
      <List sx={{ width: '100%' }}>
        {navLinks.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ justifyContent: 'center' }}>
            <ListItemText>
              {item.isButton ? (
                // Get a Quote button, centered
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
                  <Button
                    href={item.href}
                    variant="contained"
                    sx={{
                      backgroundColor: '#00A99B',
                      color: '#ffffff',
                      width: '80%',
                      textTransform: 'none',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,

                      // ── ADDED: Grow (scale) effect on hover/tap
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: '#009181',
                        transform: 'scale(1.05)',
                      },
                      '&:active': {
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </Box>
              ) : (
                // Regular text links, also centered
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
                  <Button
                    href={item.href}
                    sx={{
                      color: '#ffffff',
                      textTransform: 'none',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,

                      // ── ADDED: Grow (scale) effect on hover/tap
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                      '&:active': {
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </Box>
              )}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          color: '#ffffff', // desktop link color will be white
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 6 }, py: { xs: 2, md: 4 } }}>
          {/* ── Logo on Desktop (no extra text) ── */}
          <Box component="a" href="#" sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src={logo}
              alt="Southeast Insurance"
              sx={{
                height: 80,
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, alignItems: 'center' }}>
            {navLinks.map((item) =>
              item.isButton ? (
                <Button
                  key={item.label}
                  href={item.href}
                  variant="contained"
                  sx={{
                    backgroundColor: '#00A99B',
                    color: '#ffffff',
                    textTransform: 'none',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,

                    // ── ADDED: Grow (scale) effect on hover
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: '#009181',
                      transform: 'scale(1.05)',
                    },
                    '&:active': {
                      transform: 'scale(1.02)',
                    },

                    // ── Existing font-size adjustment you requested:
                    fontSize: '1.15rem',
                    textShadow: '0 1px 2px rgba(0,0,0,0.7)',
                  }}
                >
                  {item.label}
                </Button>
              ) : (
                <Button
                  key={item.label}
                  href={item.href}
                  sx={{
                    color: '#ffffff',
                    textTransform: 'none',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,

                    // ── ADDED: Grow (scale) effect on hover
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                    '&:active': {
                      transform: 'scale(1.02)',
                    },

                    // ── Existing font-size adjustment you requested:
                    fontSize: '1.15rem',
                    textShadow: '0 1px 2px rgba(0,0,0,0.7)',
                  }}
                >
                  {item.label}
                </Button>
              )
            )}
          </Box>

          {/* ── Mobile Menu Icon ── */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon sx={{ color: '#ffffff' }} />
          </IconButton>
        </Toolbar>

        {/* ── Mobile Drawer ── */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Improves performance on mobile
          PaperProps={{ sx: { width: 240 } }}
        >
          {drawer}
        </Drawer>
      </AppBar>
    </HideOnScroll>
  );
}
