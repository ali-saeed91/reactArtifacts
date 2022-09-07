/* eslint-disable react/no-unescaped-entities */
import { React, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { amplifySignUp } from "api/AmplifyApi";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


const validationSchema = yup.object({
  givenName: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify your first name'),
  familyName: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify your last name'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  password: yup
    .string()
    .required('Please specify your password')
    .min(8, 'The password should have at minimum length of 8'),
});

const Form = () => {
  const history = useHistory();
  const [openSpinner, setOpenSpinner] = useState(false);


  const initialValues = {
    givenName: '',
    familyName: '',
    email: '',
    password: '',
  };


  const onSubmit = async (values) => {
    // console.log(values);
    setOpenSpinner(true);

    //email: "balbir@gmail.com"
    //givenName: "Balbir"
    //familyName: "Singh"
    //password: "balbir@gmail.com"

    values.username = values.email;
    // values.given_name = values.givenName;
    // values.family_name = values.familyName
    if (await amplifySignUp(values)) {
      history.push("/login");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openSpinner}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box>
        <Box marginBottom={4}>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'medium',
            }}
            gutterBottom
            color={'text.secondary'}
          >
            Signup
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            Create an account
          </Typography>
          <Typography color="text.secondary">
            Fill out the form to get started.
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                Enter your first name
              </Typography>
              <TextField
                label="First name *"
                variant="outlined"
                name={'givenName'}
                fullWidth
                value={formik.values.givenName}
                onChange={formik.handleChange}
                error={
                  formik.touched.givenName && Boolean(formik.errors.givenName)
                }
                helperText={formik.touched.givenName && formik.errors.givenName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                Enter your last name
              </Typography>
              <TextField
                label="Last name *"
                variant="outlined"
                name={'familyName'}
                fullWidth
                value={formik.values.familyName}
                onChange={formik.handleChange}
                error={formik.touched.familyName && Boolean(formik.errors.familyName)}
                helperText={formik.touched.familyName && formik.errors.familyName}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                Enter your email
              </Typography>
              <TextField
                label="Email *"
                variant="outlined"
                name={'email'}
                inputProps={{style: {textTransform: 'lowercase'}}}
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                Enter your password
              </Typography>
              <TextField
                label="Password *"
                variant="outlined"
                name={'password'}
                type={'password'}
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item container xs={12}>
              <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'stretched', sm: 'center' }}
                justifyContent={'space-between'}
                width={1}
                maxWidth={600}
                margin={'0 auto'}
              >
                <Box marginBottom={{ xs: 1, sm: 0 }}>
                  <Typography variant={'subtitle2'}>
                    Already have an account?{' '}
                    <Link
                      component={'a'}
                      color={'primary'}
                      href={'/login'}
                      underline={'none'}
                    >
                      Login.
                    </Link>
                  </Typography>
                </Box>
                <Button size={'large'} variant={'contained'} type={'submit'}>
                  Sign up
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              container
              xs={12}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Typography
                variant={'subtitle2'}
                color={'text.secondary'}
                align={'center'}
              >
                By clicking "Sign up" button you agree with our{' '}
                <Link
                  component={'a'}
                  color={'primary'}
                  href={'/company-terms'}
                  underline={'none'}
                >
                  company terms and conditions.
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default Form;
