import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import axios from "axios";


class Contact extends React.Component {

  state = {
    email: "",
    emailError: null,
    error: null,
    success: false
  };

  validate(value) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  }

  // Trying with some online tutorial
  handleSubmit() {
    console.log(this.state);
    this.setState({ emailError: null });
    const email = this.state.email;
    
    if (email == null || email.trim().length === 0) {
      this.setState({ emailError: "Please enter email." })
      return;
    }
    if (!this.validate(email)) {
      this.setState({ emailError: "Provide valid email" });
      return;
    }
    this.setState({ success: true });
    console.log(this.state.email);

    let notification_email = {
      email: this.state.email
    };
    // var postData = JSON.stringify(notification_email);
    var formData = new FormData();
    // formData.append("postData",postData );
    // notification_email = notification_email.toString('base64');
    formData.append('Data', JSON.stringify(notification_email));
    // your api request will go here
    console.log(formData);

    axios({
      method: 'post',
      url: 'https://post.firstsalary.com/tech@firstsalary.com',
      data: formData
    });

    this.setState({
      email: ''
    })

  };


  render() {
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
              <Box
                flex={'1 1 auto'}
                component={TextField}
                value={this.state.email}
                onChange={(event) => {
                  this.setState({
                    email: event.target.value,
                    emailError: null
                  })
                }}
                label="Enter your email"
                variant="outlined"
                color="primary"
                fullWidth
                height={54}
                sx={{
                  maxWidth: 422,
                }}
                error={this.state.emailError !== null}
              />

              {/* Show error if no email or wrong email */}
              {this.state.emailError !== null &&
                <Typography variant="h6" component="p" color="secondary">
                  {this.state.emailError}
                </Typography>}

              <Box
                component={Button}
                // We need to bind "this" here, I guess it is event here
                onClick={this.handleSubmit.bind(this)}
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
      </Box>
    );
  };
}

export default Contact;
