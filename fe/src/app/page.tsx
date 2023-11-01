"use client";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import Link from 'next/link';
import Button from '@mui/material/Button/Button';
import Grid from "@mui/material/Grid/Grid";
import Card from "@mui/material/Card/Card";
import CardContent from "@mui/material/CardContent/CardContent";
import Image from 'next/image'

const features = [
  {
    title: 'Task Organization',
    description: 'Easily organize your tasks into categories for better management.'
  },
  {
    title: 'Priority Setting',
    description: 'Set priorities for your tasks and focus on what matters the most.'
  },
  {
    title: 'Productivity Boost',
    description: 'Increase your productivity with our intuitive task management solution.'
  }
]

const usersComments = [
  "I've never been more organized in my life. This app is a game-changer!",
  "Task Manager helped me prioritize my work and achieve my goals."
]

export default function Home() {

  return (
      <Container component='main' maxWidth={false} disableGutters sx={{textAlign: 'center'}}>
        <Box sx={{display: 'flex', justifyContent: 'center', backgroundColor: '#CDF5FD42'}}>
          <Box sx={{maxWidth: 'md', py: '4em', textAlign: 'center'}}>
            <Typography variant="h4" gutterBottom>
              Your Task, Your Priority
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" paragraph>
              Simplify your life with our task management app. Organize your tasks, set priorities,
              and stay productive.
            </Typography>
            <Link href={'/categories/my-categories'}>
              <Button variant="contained" color={'primary'} size="large" sx={{mt: '1em'}}>
                Get Started
              </Button>
            </Link>
          </Box>
          <Box component={'div'} display={'flex'} alignItems={'center'}>
            <Image src={'/task_image.jpg'} alt={'Task Management'}
                   style={{borderRadius: 222, boxShadow: '0 0 5px black', marginLeft: 24}}
                   width={250} height={250}/>
          </Box>
        </Box>

        <Box
            sx={{display: 'flex', justifyContent: 'center', backgroundColor: '#BD165711'}}>
          <Box sx={{maxWidth: 'md', py: '4em', textAlign: 'center'}}>
            <Typography variant="h5">
              Key Features
            </Typography>
            <Grid container mt={1} spacing={4}>
              {features.map((feature) => (
                  <Grid key={feature.title} item xs={12} sm={4}>
                    <Card
                        sx={{
                          p: 3,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center'
                        }}>
                      <Typography variant="h6">{feature.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {feature.description}
                      </Typography>
                    </Card>
                  </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        <Box
            sx={{display: 'flex', justifyContent: 'center', backgroundColor: '#CDF5FD42'}}>
          <Box sx={{maxWidth: 'md', py: '4em', textAlign: 'center'}}>
            <Typography variant="h5">
              What Users Say
            </Typography>
            <Grid container mt={1} spacing={4}>
              {usersComments.map((comment, idx: number) => (
                  <Grid key={comment} item xs={12} sm={6}>
                    <Card
                        sx={{
                          p: 3,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          backgroundColor: 'primary'
                        }}>
                      <CardContent>
                        <Typography variant="body1" color="inherit">
                          "{comment}"
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        <Box
            sx={{display: 'flex', justifyContent: 'center', backgroundColor: '#BD165711'}}>
          <Box sx={{maxWidth: 'md', py: '4em', textAlign: 'center'}}>
            <Typography variant="h5" fontWeight={'bold'} gutterBottom>
              Ready to Get Started?
            </Typography>
            <Link href={'/auth/register'}>
              <Button variant="contained" color="primary" size="large" sx={{mt: '1em'}}>
                Sign Up Now
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
  )
}
