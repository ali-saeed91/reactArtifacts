import React, { useState, forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// import axios from "axios";

import MuiAlert from '@mui/material/Alert';
import { SubscriberList } from 'models';
import { Auth, DataStore, Storage } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify'
import { listUploadResumes } from 'graphql/queries'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';


const Contact = () => {
  let getBlog = async () => {
    // const data = await API.graphql(graphqlOperation(listUploadResumes))
    const data = await API.graphql({
      query: listUploadResumes,
      authMode: 'AWS_IAM'
    })
    console.log('listUploadResumes successfully fetched: ', data)
  }

  getBlog();

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // Define all the variables to use useState
  const [email, setEmail] = useState("");
  // const [submitted, setSubmitted] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [emailHelper, setEmailHelper] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(Math.floor(Math.random() * 100000));

  // Fetching curent total number of registered users
  // fetch('https://api.firstsalary.com/stats', { headers: {
  //   'content-type': 'application/json'
  // }}).then(async response => {const data = await response.json(); setRegisteredUser(data.Items[0].subscriber['N']) }).catch((er) => {
  //   console.log(er);
  //   setErrorOpen(true);
  // });
  // There is double display of regisrered user number and it needs to be fixed

  // Trying to fix Snackbar
  // const handleClick = () => {
  //   setSuccessOpen(true);
  //   // setErrorOpen(true);

  // };

  // const handleErrorClick = () => {
  //   setErrorOpen(true);

  // };

  const handleSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessOpen(false);
    // setErrorOpen(false);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorOpen(false);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("email: ", email);
    if (!email) {
      // console.log("Please provide input here!")
      setEmailHelper("Please Enter Email")
    }

    if (validEmail) {
      let notification_email = {
        email: email.toLowerCase()
      };

      const posted = await DataStore.save(
        new SubscriberList({
          "email": email,
          "userAgent": 'ToDo',
          "clientIp": '1.2.3.4',
          "subscribedDate": new Date().toISOString()
        })
      );
      console.log(posted);

      await fetch('https://api.firstsalary.com/email', {
        method: 'post',
        body: JSON.stringify(notification_email),
        headers: {
          'content-type': 'application/json'
        }
      }).then((result) => {
        // console.log(result);
        if (!result.ok) {
          throw new Error("HTTP status " + result.status);
        }
        else {
          setEmail("");
          setSuccessOpen(true);
          setRegisteredUser(registeredUser + 1);
        }
      }).catch((er) => {
        console.log(er);
        setErrorOpen(true);
      });
    }

  }


  const handleEmailInputChange = event => {
    let valid;
    switch (event.target.id) {
      case 'email':
        setEmail(event.target.value);
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value);
        if (!valid) {
          setEmailHelper("Invalid Email");
          setValidEmail(false);
        } else {
          setEmailHelper("");
          setValidEmail(true);
        }
        break;
      default:
        break;
    }
  }


  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          fontWeight={700}
          variant={'h4'}
          align={'center'}
          gutterBottom
        >
          Ready to get notified for new job listing?
        </Typography>
        <Typography
          variant={'h6'}
          component={'p'}
          color={'text.secondary'}
          align={'center'}
        >
          Get immediate notification when new jobs are listed.
        </Typography>
      </Box>
      <Box maxWidth={600} margin={'0 auto'}>
        <Box
          component={'form'}
          noValidate
          autoComplete="off"
          sx={{
            '& .MuiInputBase-input.MuiOutlinedInput-input': {
              bgcolor: 'background.paper',
            },
          }}
        >
          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'center', md: 'flex-start' }}
            justifyContent={{ xs: 'center' }}
          >

            {/* // Trying for flashing snackbar */}
            {/* <Stack spacing={2} sx={{ width: '100%' }}> */}
            <Stack>

              {/* <Button variant="outlined" onClick={handleClick}>
                Open success snackbar
              </Button> */}
              <Snackbar
                open={successOpen}
                autoHideDuration={6000}
                onClose={handleSuccessClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
                  We will notify you for new job!
                </Alert>
              </Snackbar>
              <Snackbar
                open={errorOpen}
                autoHideDuration={6000}
                onClose={handleErrorClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                  There seems to be some error, please try again after some time!
                </Alert>
              </Snackbar>
            </Stack>

            <Box
              value={email}
              error={emailHelper.length !== 0}
              helperText={emailHelper}
              onChange={handleEmailInputChange}
              flex={'1 1 auto'}
              component={TextField}
              label="Enter your email"
              variant="outlined"
              inputProps={{style: {textTransform: 'lowercase'}}}
              name="email"
              id="email"
              color="primary"
              fullWidth
              height={54}
              sx={{
                maxWidth: 422,
              }}
            />
            <Box
              onClick={handleSubmit}
              component={Button}
              variant="contained"
              color="primary"
              size="large"
              height={54}
              marginTop={{ xs: 2, md: 0 }}
              marginLeft={{ md: 2 }}
            >
              Submit
            </Box>
          </Box>

        </Box>

      </Box>
      {/* <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <Chip label="Total regisred: 45345" color="primary" variant="outlined" />
      </Stack> */}
      <Box marginTop={1}>
        <Typography
          variant={'h9'}
          component={'p'}
          color={'text.secondary'}
          align={'center'}
        >
          Total Registered: {registeredUser}
        </Typography>
      </Box>
    </Box >
  );
};

export default Contact;
