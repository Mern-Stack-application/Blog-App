
"use client"; // This is a client component 
import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import "./navbar.module.css"
import { Link } from '@mui/material';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blogs
          </Typography>
          <Link href = "http://localhost:3000/component/signup" color="inherit" class='button-signup'>
             Sign Up
          </Link>
          <Link href = "http://localhost:3000/component/login" color="inherit">
          Login
          </Link>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
