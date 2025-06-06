// ── src/components/Navbar.jsx ──
import React, { useState, useEffect } from 'react';
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
  Slide,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '/img/southeast-logo.png';

// HideOnScroll: hides the AppBar when scrolling down, shows only at top
function HideOnScroll(props) {
  const { children } = props;
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        // At the top of the page, always show
        setShow(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down, hide
        setShow(false);
      }
      // When scrolling up (currentScrollY < lastScrollY), do nothing unless at top
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <Slide appear={false} direction="down" in={show}>
      {children}
    </Slide>
  );
}
HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};


{/* Drawer Contents */}
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const navLinks = [
    { label: 'Coverage', href: '#coverage' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Get a Quote', href: '#quote', isButton: true },
  ];

  {/* Drawer Contents */}
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        width: 240,
        height: '100%',
        backgroundColor: '#333333',
        color: '#ffffff',
        pt: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Drawer Logo */}
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

      {/* ── Navbar Links ── */}
      <List sx={{ width: '100%' }}>
        {navLinks.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ justifyContent: 'center' }}>
            <ListItemText>
              {item.isButton ? (
                // Get a Quote button
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
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
                  <Button
                    href={item.href}
                    sx={{
                      color: '#ffffff',
                      textTransform: 'none',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,
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
          color: '#ffffff',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 6 }, py: { xs: 2, md: 4 } }}>
          {/* Desktop Logo */}
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
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: '#009181',
                      transform: 'scale(1.05)',
                    },
                    '&:active': {
                      transform: 'scale(1.02)',
                    },
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
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                    '&:active': {
                      transform: 'scale(1.02)',
                    },
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
          ModalProps={{ keepMounted: true }}
          PaperProps={{ sx: { width: 240 } }}
        >
          {drawer}
        </Drawer>
      </AppBar>
    </HideOnScroll>
  );
}