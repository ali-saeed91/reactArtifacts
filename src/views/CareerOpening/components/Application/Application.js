import { React, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import CircularProgress from "@mui/material/CircularProgress";
// import axios from 'axios';
import { Auth, DataStore, Storage } from "aws-amplify";
import { UploadResume } from "models";
import { useHistory } from "react-router-dom";

const validationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(2, "Please enter a valid first name")
    .max(50, "Please enter a valid first name")
    .required("Please specify your first name"),
  lastName: yup
    .string()
    .trim()
    .min(2, "Please enter a valid last name")
    .max(50, "Please enter a valid last name")
    .required("Please specify your last name"),
  message: yup
    .string()
    .trim()
    .required("Please specify your message"),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

const Application = () => {
  const theme = useTheme();
  const history = useHistory();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    message: "",
    email: "",
  };

  const onSubmit = async (values) => {
    // const anonymousUser = await Auth.currentCredentials()
    // console.log('anonymousUser: ', anonymousUser);
    // console.log(values);
    // console.log("Uploaded File", file.S3Name);
    const fullName = values.firstName + " " + values.lastName;
    const posted = await DataStore.save(
      new UploadResume({
        fullName: fullName,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        s3Location: file.S3Name,
        message: values.message,
      })
    );
    console.log(posted);
    history.push("/");
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  // Function to upload file to S3
  // const uploadToS3 = async (file) => {
  //   // Upload file to S3 via Amplify
  //   try {
  //     let file_name = file.name.replace(/[^A-Z0-9\.]+/ig, '_');
  //     let today = new Date();
  //     let today_date = today.getFullYear() + '' + (today.getMonth()+1) + '' + today.getDate();
  //     file_name = today_date + "_" + file_name;

  //     console.log("file name: ", file_name)
  //     const result = await Storage.put(file_name, file, {
  //       contentType: file.type
  //     });
  //     console.log("S3: ", result);
  //     setLoading(false);
  //     setFile(file);
  //   } catch (error) {
  //     console.log("Error uploading file: ", error);
  //     setLoading(false);
  //   }
  // }
  // function to upload the file
  const uploadToS3 = async (file) => {
    // console.log(await Auth.currentSession());
    // console.log(await Auth.currentCredentials());

    // const formData = new FormData();
    if (file?.size > 5242880) {
      setErrorOpen(true);
      setLoading(false);
      return;
    }

    console.log("Name: ", file.name);
    console.log("Type: ", file.type);
    console.log("Size: ", file.size);

    console.log("File Info: ", file);
    // formData.append("file", file);
    // setLoading(false);

    // Upload to S3
    try {
      let file_name = file.name.replace(/[^A-Z0-9\.]+/gi, "_");
      let today = new Date();
      // let today_date = today.getFullYear() + '' + (today.getMonth()+1) + '' + today.getDate();
      let today_date =
        today.getFullYear() +
        "" +
        ("0" + (today.getMonth() + 1)).slice(-2) +
        "" +
        ("0" + today.getDate()).slice(-2) +
        "" +
        ("0" + today.getHours()).slice(-2) +
        "" +
        ("0" + today.getMinutes()).slice(-2) +
        "" +
        ("0" + today.getSeconds()).slice(-2);
      file_name = today_date + "_" + file_name;
      file.S3Name = file_name;

      console.log("file name: ", file_name);
      const result = await Storage.put(file_name, file, {
        level: "public",
        contentType: file.type,
      });
      console.log("S3: ", result);
      console.log(file);
      setLoading(false);
      setFile(file);
    } catch (error) {
      console.log("Error uploading file: ", error);
      setLoading(false);
    }
    // axios
    //   .post("https://upload.sifar.io", formData)
    //   .then((result) => {
    //     console.log("Success:", result);
    //     setLoading(false);
    //     setFile(file);
    //   })
    //   .catch((error) => {
    //     console.log("Error:", error);
    //     setLoading(false);
    //   });
  };

  return (
    <Box maxWidth={800} margin={"0 auto"}>
      <Box marginBottom={2}>
        <Typography
          variant={"h4"}
          sx={{ fontWeight: 700 }}
          gutterBottom
          align={"center"}
        >
          Apply for this job
        </Typography>
        <Typography color="text.secondary" align={"center"}>
          We develop intelligent solutions for companies to reduce their
          operational costs, increase their profitability and improve service
          quality.
        </Typography>
      </Box>
      <Box
        component={"form"}
        onSubmit={formik.handleSubmit}
        sx={{
          "& .MuiOutlinedInput-root.MuiInputBase-multiline": {
            padding: 0,
          },
          "& .MuiOutlinedInput-input": {
            background: theme.palette.background.paper,
            padding: 2,
          },
        }}
      >
        <Grid container spacing={isMd ? 4 : 2}>
          <Grid item md={6} xs={12} data-aos="fade-up">
            <Typography
              variant="subtitle1"
              color="text.primary"
              fontWeight={700}
              gutterBottom
            >
              First name
            </Typography>
            <TextField
              placeholder="Your first name"
              variant="outlined"
              size="medium"
              name="firstName"
              fullWidth
              type="text"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item md={6} xs={12} data-aos="fade-up">
            <Typography
              variant="subtitle1"
              color="text.primary"
              fontWeight={700}
              gutterBottom
            >
              Last name
            </Typography>
            <TextField
              placeholder="Your last name"
              variant="outlined"
              size="medium"
              name="lastName"
              fullWidth
              type="text"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12} data-aos="fade-up">
            <Typography
              variant="subtitle1"
              color="text.primary"
              fontWeight={700}
              gutterBottom
            >
              E-mail
            </Typography>
            <TextField
              placeholder="Your e-mail address"
              variant="outlined"
              size="medium"
              name="email"
              fullWidth
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} data-aos="fade-up">
            <Button
              variant="outlined"
              component="label"
              color="primary"
              fullWidth
              size="large"
              startIcon={
                <Box
                  component={"svg"}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  width={20}
                  height={20}
                >
                  {!loading && file === null && (
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  )}
                </Box>
              }
            >
              {!loading && file === null && <Typography>Upload CV</Typography>}
              {loading && file === null && <CircularProgress />}
              {!loading && file && <Typography>{file.name}</Typography>}

              <input
                onChange={(event) => {
                  // console.log
                  // (
                  //   "event.currentTarget.files[0]",
                  //   event.currentTarget.files[0]
                  // );
                  // making the loader true
                  setLoading(true);
                  uploadToS3(event.currentTarget.files[0]);
                }}
                name="filename"
                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                type="file"
                style={{ display: "none" }}
              />
              <Stack>
                <Snackbar
                  open={errorOpen}
                  autoHideDuration={3000}
                  onClose={handleErrorClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <Alert
                    onClose={handleErrorClose}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    File size limit is 5MB!
                  </Alert>
                </Snackbar>
              </Stack>
            </Button>
          </Grid>
          {/* <Grid item xs={12} sm={6} data-aos="fade-up">
            <Button
              variant="outlined"
              component="label"
              color="primary"
              fullWidth
              size="large"
              startIcon={
                <Box
                  component={'svg'}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  width={20}
                  height={20}
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </Box>
              }
            >
              Upload cover letter
              <input type="file" style={{ display: 'none' }} />
            </Button>
          </Grid> */}
          <Grid item xs={12} data-aos="fade-up">
            <Typography
              variant="subtitle1"
              color="text.primary"
              fontWeight={700}
              gutterBottom
            >
              Message
            </Typography>
            <TextField
              placeholder="Your question about our services"
              variant="outlined"
              name="message"
              fullWidth
              multiline
              rows={4}
              value={formik.values.message}
              onChange={formik.handleChange}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
            />
          </Grid>
          <Grid item container justifyContent="center" xs={12}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
            >
              Apply now
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Application;
