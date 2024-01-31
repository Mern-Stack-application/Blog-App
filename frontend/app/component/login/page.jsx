"use client"; // This is a client component

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {RouterLink } from 'react-router-dom';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const SignIn = () => {
    const [error, setError] = useState(null);
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      const checkAuthentication = () => {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, '$1');
  
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            setIsAuthenticated(true);
          } catch (error) {
            setIsAuthenticated(false);
          }
        }
      };
  
      checkAuthentication();
    }, []);
  
    const handleSignIn = async (event) => {
      event.preventDefault();
  
      const formData = new FormData(event.target);
  
      try {
        const response = await axios.post('http://localhost:8800/api/auth/login/', formData);
        const token = response.data.access_token;
  
        document.cookie = `access_token=${token}; path=/`;
        setIsAuthenticated(true);
  
        // Redirect to the home page or profile page using router.push
        router.push('/');
      } catch (error) {
        console.error('Error signing in:', error.response ? error.response.data : error.message);
        setError('Invalid username or password');
      }
    };
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            {isAuthenticated ? 'Welcome back!' : 'Sign in'}
          </Typography>
          <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
            {isAuthenticated ? (
              <div>
                <p>Welcome, User!</p>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/forgot-password">
                      <a>Forgot password?</a>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup">
                      <a>{"Don't have an account? Sign Up"}</a>
                    </Link>
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        </Box>
      </Container>
    );
  };
  
  export default SignIn;