import React from 'react';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';
import { Application, Main as MainSection, Newsletter } from './components';

const CareerOpening = (props) => {
  // console.log(props);
  // console.log(props.match.params.jobId);
  // console.log(parseInt(props.match.params.jobId));

  return (
    <Main>
      <Container>
        <MainSection {...props} />
      </Container>
      <Box bgcolor={'alternate.main'}>
        <Container>
          <Application />
        </Container>
      </Box>
      <Container>
        <Newsletter />
      </Container>
    </Main>
  );
};

export default CareerOpening;
