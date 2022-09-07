import { React, useContext } from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import NavItem from './components/NavItem';

import { amplifyLogout } from "api/AmplifyApi";
import { AuthContext } from "contexts/AuthProvider"

const SidebarNav = ({ pages, onClose }) => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const {
    landings: landingPages,
    secondary: secondaryPages,
    account: accountPages,
  } = pages;

  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'flex-end'}
        onClick={() => onClose()}
      >
        <IconButton>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box paddingX={2} paddingBottom={2}>
        {/* <Box>
          <NavItem title={'Landings'} items={landingPages} />
        </Box>
        <Divider sx={{ marginBottom: 2 }} />
        <Box>
          <NavItem title={'Pages'} items={secondaryPages} />
        </Box> */}
        <Divider sx={{ marginBottom: 2 }} />
        {authCtx.defaultUser ? (
          <Box marginLeft={3} color="text.primary">Hello {authCtx.defaultUser.attributes.email} !</Box>
        ) :
          null
          }
        <Box>
          <NavItem title={'Account'} items={accountPages} />
        </Box>
        <Divider sx={{ marginBottom: 2 }} />
        <Box marginTop={1}>
          <Button
            variant="outlined"
            fullWidth
            component="a"
            href="/blog"
          >
            Blog
          </Button>
        </Box>
        <Box marginTop={1}>
        {authCtx.defaultUser ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              component="a"
              // target="blank"
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
              fullWidth
              component="a"
              // target="blank"
              href="/login"
            >
              Login
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

SidebarNav.propTypes = {
  pages: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default SidebarNav;
