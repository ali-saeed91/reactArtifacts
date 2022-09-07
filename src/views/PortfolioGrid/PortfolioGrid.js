import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Main from 'layouts/Main';
import Container from 'components/Container';
import { Hero, Main as MainSection, Partners, Contact, FeaturedArticle, LastStories } from './components';

import { Helmet } from 'react-helmet';

const PortfolioGrid = () => {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title>First Salary | Home </title>
      </Helmet>
      <Main>
        <Container>
          <Hero />
        </Container>
        <Container paddingY={'0 !important'}>
          <Partners />
        </Container>
        <Container>
          <MainSection />
        </Container>
        <Container maxWidth={800} paddingY={'0 !important'}>
          <Divider />
        </Container>
        <Container>
          <FeaturedArticle />
        </Container>
        <Container paddingTop={'0 !important'}>
          <LastStories />
        </Container>
        <Box
          position={'relative'}
          marginTop={{ xs: 4, md: 6 }}
          sx={{
            backgroundColor: theme.palette.alternate.main,
          }}
        >
          <Box
            component={'svg'}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 1920 100.1"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              transform: 'translateY(-50%)',
              zIndex: 2,
              width: 1,
            }}
          >
            <path
              fill={theme.palette.alternate.main}
              d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
            ></path>
          </Box>
          <Container>
            <Contact />
          </Container>
        </Box>
      </Main>
    </>
  );
};

export default PortfolioGrid;
