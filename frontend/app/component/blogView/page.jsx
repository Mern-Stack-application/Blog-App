"use client"; // This is a client component 

// pages/component/blogView/[blogId].js

import { useNavigation } from 'next/navigation';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Navbar from '../navbar/Navbar';


function ViewBlog() {
    const navigation = useNavigation();
  const { blogId } = navigation.router.query;
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`http://localhost:8800/api/blogs/${blogId}`);
        const data = await response.json();
        setBlogData(data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    if (blogId) {
      fetchBlogData();
    }
  }, [blogId]);
  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Navbar/>
      <main style={{ paddingTop: '30px' }}>
        <Container maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              {blogData && (
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '50%',
                    }}
                    image={`https://source.unsplash.com/random?${blogData.title}`}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {blogData.title}
                    </Typography>
                    <Typography>{blogData.content}</Typography>
                    {/* Add more fields as needed */}
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        {/* You can keep the Copyright component as is */}
      </Box>
    </ThemeProvider>
  );
}

export default ViewBlog;
