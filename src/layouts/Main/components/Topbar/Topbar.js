import { React, useContext } from 'react';
import { useHistory } from "react-router-dom";

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

import { NavItem, ThemeModeToggler } from './components';

import { amplifyLogout } from "api/AmplifyApi";
import { AuthContext } from "contexts/AuthProvider"

// Import the logo 
import logoImg from 'images/logo.svg';

// import ReactGA from 'react-ga';
// import AppConfig from 'AppConfig';

const Topbar = ({ onSidebarOpen, pages }) => {

  const history = useHistory();
  const authCtx = useContext(AuthContext);

  // ReactGA.initialize(AppConfig.GOOGLE.GA_MEASUREMENT_ID);
  // ReactGA.pageview(window.location.pathname + window.location.search);

  const theme = useTheme();
  const { mode } = theme.palette;
  const {
    landings: landingPages,
    secondary: secondaryPages,
    account: accountPages,
  } = pages;

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Box
        display={'flex'}
        component="a"
        href="/"
        title="First Salary"
        // Played with below value to get perfect size
        width={{ xs: 157, md: 189 }}
      >
        <Box
          component={'img'}
          // src={
          //   mode === 'light'
          //     ? 'https://assets.maccarianagency.com/the-front/logos/logo.svg'
          //     : 'https://assets.maccarianagency.com/the-front/logos/logo-negative.svg'
          // }
          // Tried to put a png file
          src={logoImg}
          // Tried below randomly per stackoverflow
          // style={{ height: 200, width: 400 }}
          height={1}
          width={1}
        />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        {/* <Box>
          <NavItem
            title={'Landings'}
            id={'landing-pages'}
            items={landingPages}
          />
        </Box>
        <Box marginLeft={3}>
          <NavItem
            title={'Pages'}
            id={'secondary-pages'}
            items={secondaryPages}
          />
        </Box> */}
        {authCtx.defaultUser ? (
          <Box marginLeft={3} color="text.primary">Hello {authCtx.defaultUser.attributes.given_name} !</Box>
        ) :
          null
          }
        <Box marginLeft={3} color="text.primary">
          <NavItem
            title={'Account'}
            id={'account-pages'}
            items={accountPages}
          />
        </Box>
        <Box marginLeft={3}>
          <Link
            underline="none"
            component="a"
            href="/blog"
            color="text.primary"
          >
            Blog
          </Link>
        </Box>
        {/* This is day and night theme mode, not needed */}
        {/* <Box marginLeft={3}>
          <ThemeModeToggler />
        </Box> */}
        <Box marginLeft={3}>
          {authCtx.defaultUser ? (
            <Button
              variant="contained"
              color="primary"
              component="a"
              // target="blank"
              size="large"
              onClick={() => {
                amplifyLogout();
                authCtx.dispatchAction({ type: "SIGN_OUT" });
                history.push("/");
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              component="a"
              // target="blank"
              href="/login"
              size="large"
            >
              Login
            </Button>
          )}

        </Box>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
        {/* <Box marginRight={2}>
          <ThemeModeToggler />
        </Box> */}
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant={'outlined'}
          sx={{
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object,
};

export default Topbar;
