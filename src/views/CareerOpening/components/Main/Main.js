import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import JobsConfig from 'JobsConfig';
import { Helmet } from 'react-helmet';


const Main = (props) => {
  // ToDo: This function gets called twice, why? Not sure
  let jobId = props.match.params.jobId;
  // 1729 also mentioned in src/views/PortfolioGrid/components/Main/Main.js
  jobId = jobId - 1729;

  // If JobID doesn't exist then redirect to /not-found-cover
  if (!(jobId in JobsConfig)) {
    props.history.push('/not-found-cover')
  }
  // console.log("from Main.js", props);
  // // console.log(props.match.params.jobId);
  // // console.log(parseInt(props.match.params.jobId));

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <>
      <Helmet>
        <title>First Salary | {JobsConfig[jobId]?.title + " | " + `${parseInt(jobId) + 1729}` + " | " + JobsConfig[jobId]?.city} </title>
      </Helmet>
      <Box>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Box>
            <Typography fontWeight={700} variant={'h4'} gutterBottom>
              {JobsConfig[jobId]?.title}
            </Typography>
            <Typography variant={'h6'}>{JobsConfig[jobId]?.city + ", " + JobsConfig[jobId]?.country + " - " + JobsConfig[jobId]?.type}</Typography>
          </Box>
          <Box display="flex" marginTop={{ xs: 2, md: 0 }}>
            <Button variant="contained" color="primary" size="large">
              Apply now
            </Button>
            <Box
              component={Button}
              variant="outlined"
              color="primary"
              size="large"
              marginLeft={2}
            >
              Refer a friend
            </Box>
          </Box>
        </Box>
        <Divider sx={{ marginY: 4 }} />
        <Grid container spacing={isMd ? 4 : 2}>
          <Grid item xs={12} md={8}>
            <Box marginBottom={3}>
              <Typography variant={'h5'} fontWeight={700} gutterBottom>
                Who we are
              </Typography>
              <Typography component={'p'}>
                {JobsConfig[jobId]?.company_details}
              </Typography>
            </Box>
            <Box marginBottom={3}>
              <Typography variant={'h5'} fontWeight={700} gutterBottom>
                What we’re looking for
              </Typography>
              <Typography component={'p'}>
                {JobsConfig[jobId]?.job_details_header}
              </Typography>
              <Grid container spacing={1} sx={{ marginTop: 1 }}>
                {JobsConfig[jobId]?.bullet_points.map((item, i) => (
                  <Grid item xs={12} key={i}>
                    <Box
                      component={ListItem}
                      disableGutters
                      width={'auto'}
                      padding={0}
                    >
                      <Box
                        component={ListItemAvatar}
                        minWidth={'auto !important'}
                        marginRight={2}
                      >
                        <Box
                          component={Avatar}
                          bgcolor={theme.palette.secondary.main}
                          width={20}
                          height={20}
                        >
                          <svg
                            width={12}
                            height={12}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Box>
                      </Box>
                      <ListItemText primary={item} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box>
              <Typography variant={'h5'} fontWeight={700} gutterBottom>
                Why to apply
              </Typography>
              <Typography component={'p'}>
                {JobsConfig[jobId]?.job_details_footer}
              </Typography>
            </Box>
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <Grid container spacing={isMd ? 4 : 2} direction="column">
              <Grid item xs={12} data-aos="fade-up">
                <Box component={Card} bgcolor={'primary.main'}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      color="text.primary"
                      sx={{ color: 'common.white' }}
                    >
                      You like what you’re reading?
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{ color: 'common.white' }}
                    >
                      Get free online programing tips and resources delivered
                      directly to your inbox.
                    </Typography>
                  </CardContent>
                </Box>
              </Grid>
              <Grid item xs={12} data-aos="fade-up">
                <Box component={Card}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="text.primary">
                      Interactive decision support system
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      endIcon={
                        <Box
                          component={'svg'}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          width={24}
                          height={24}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </Box>
                      }
                    >
                      View all
                    </Button>
                  </CardContent>
                </Box>
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
};

export default Main;
