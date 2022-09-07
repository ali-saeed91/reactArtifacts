import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';

import JobsConfig from 'JobsConfig';

// Formating JobsConfig so that mock can be accepted in the below app logic
const mock = [];
for (let item in JobsConfig){
  JobsConfig[item]['jobId'] = parseInt(item);
  mock.push(JobsConfig[item])
}


const Main = () => {
  const theme = useTheme();
  return (
    <Box>
      <Grid container spacing={4}>
      {/* with the curly braces, it’s a normal function body, for the most part. to return something, you use return. But without the curly braces, the RHS of the arrow function is any expression, and that expression is the return value of the function. */}
        {mock.map((item, i) => (
          // Fiver Change - 1
          // It calculate number of boxes per device
          // Added lg={3}
          // Here 'key' component is the requirement by React https://reactjs.org/docs/lists-and-keys.html
          <Grid item xs={12} sm={6} lg={3} key={i}>
            <Box
              component={'a'}
              // Here put where each card should redirect to?
              // 1729 also mentioned in src/views/CareerOpening/components/Main/Main.js
              href={'/jobs/' + `${1729 + item.jobId}` + `/${item.title.replace(/\s/g , "-").replace(/\//g , "-").toLowerCase()}` + `-${item.city.replace(/\s/g , "-").toLowerCase()}`}
              display={'block'}
              width={1}
              height={1}
              sx={{
                textDecoration: 'none',
                transition: 'all .2s ease-in-out',
                '&:hover': {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                },
              }}
            >
              <Box
                component={Card}
                width={1}
                height={1}
                borderRadius={3}
                display={'flex'}
                flexDirection={'column'}
                sx={{
                // 5R Change - 2
                // Added size of white content add includes size of image below
                // So size of image be less than this number
                  height: { xs: 200, md: 200, lg: 200 }
                }}
              >
                <CardMedia
                  image={item.image}
                  title={item.title}
                  // 5R Change - 3
                  // Added component='img'
                  component='img'
                  sx={{
                    // 5R Change - 4
                    // Height of Image as tab
                    height: { xs: 30, md: 30, lg: 30 },
                    filter:
                      theme.palette.mode === 'dark'
                        ? 'brightness(0.7)'
                        : 'none',
                    }}
                />
                <Box component={CardContent}>
                  <Typography variant={'h6'} fontWeight={700} gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant={'body2'} color="text.secondary">
                    {item.summary}
                  </Typography>
                </Box>
                <Box flexGrow={1} />
                <Box component={CardActions} justifyContent={'flex-start'}>
                  <Button
                    size="large"
                    endIcon={
                      <svg
                        width={16}
                        height={16}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    }
                  >
                    Learn More
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Main;
