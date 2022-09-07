import React from 'react';
import Typed from 'react-typed';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Hero = () => {
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          align={'center'}
          gutterBottom
          sx={{ fontWeight: 400 }}
        >
          We help you get your first salary
        </Typography>
        <Typography
          variant="h3"
          color="text.primary"
          align={'center'}
          sx={{
            fontWeight: 700,
          }}
        >
          from{' '}
          <Typed
            strings={[
              'first commit to first salary',
              'first day at college to first day at office',
              'pocket money to paycheck',
              'semester result to payslip'
            ]}
            typeSpeed={100}
            loop={true}
            backSpeed={50}
            backDelay={1500}
          />
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;
