import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';


// Import the logo 
import logoImg from 'images/logo.svg';

const Footer = () => {
  // Get the current year
  const current_year = new Date().getFullYear();

  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={1}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Box
            display={'flex'}
            component="a"
            href="/"
            title="First Salary"
            width={120}
          >
            <Box
              component={'img'}
              // src={
              //   mode === 'light'
              //     ? 'https://assets.maccarianagency.com/the-front/logos/logo.svg'
              //     : 'https://assets.maccarianagency.com/the-front/logos/logo-negative.svg'
              // }
              src={logoImg}
              height={1}
              width={1}
            />
          </Box>
          <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'}>
            <Box marginTop={1} marginRight={2}>
              <Link
                underline="none"
                component="a"
                href="/"
                color="text.primary"
                variant={'subtitle2'}
              >
                Home
              </Link>
            </Box>
            <Box marginTop={1} marginRight={2}>
              <Link
                underline="none"
                component="a"
                href="/"
                color="text.primary"
                variant={'subtitle2'}
              >
                Blog
              </Link>
            </Box>
            <Box marginTop={1} marginRight={2}>
              <Link
                underline="none"
                component="a"
                href="/docs/introduction"
                color="text.primary"
                variant={'subtitle2'}
              >
                Documentation
              </Link>
            </Box>
            {/* <Box marginTop={1}>
              <Button
                variant="outlined"
                color="primary"
                component="a"
                target="blank"
                href="https://material-ui.com/store/items/the-front-landing-page/"
                size="small"
              >
                Purchase now
              </Button>
            </Box> */}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          align={'center'}
          variant={'subtitle2'}
          color="text.secondary"
          gutterBottom
        >
          {/* using current_year variable to show current year */}
          &copy; First Salary {current_year} | All rights reserved
        </Typography>

        {/* Adding LinkedIn, Instagram and Twitter Social Icon */}
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Link
            underline="none"
            component="a"
            href="https://www.linkedin.com/company/firstsalary"
            color="text.primary"
            variant={'subtitle2'}
          >
            <IconButton aria-label="LinkedIn">
              <LinkedInIcon />
            </IconButton>
          </Link>
          <Link
            underline="none"
            component="a"
            href="https://www.instagram.com/firstsalary"
            color="text.primary"
            variant={'subtitle2'}
          >
            <IconButton aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
          </Link>
          <Link
            underline="none"
            component="a"
            href="https://twitter.com/firstsalary"
            color="text.primary"
            variant={'subtitle2'}
          >
            <IconButton aria-label="Twitter">
              <TwitterIcon />
            </IconButton>
          </Link>
        </Box>

        <Typography
          align={'center'}
          variant={'caption'}
          color="text.secondary"
          component={'p'}
        >
          When you visit or interact with our sites, services or tools, we or
          our authorised service providers may use cookies for storing
          information to help provide you with a better, faster and safer
          experience and for marketing purposes.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
