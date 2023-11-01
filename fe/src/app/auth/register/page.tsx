"use client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button/Button";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import TextField from "@mui/material/TextField/TextField";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import Typography from "@mui/material/Typography/Typography";
import Avatar from "@mui/material/Avatar/Avatar";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {signUp} from "@/services/auth-service";
import {AuthResponse, SignUpDto, UserDto} from "@/types/auth/auth-types";
import {setAuthentication} from "@/redux/features/auth/auth-slice";
import {setToken} from "@/services/token-service";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import React from "react";
import Alert from "@mui/material/Alert/Alert";
import AlertTitle from "@mui/material/AlertTitle/AlertTitle";

export default function Register() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userDto: UserDto = {
      firstName: formData.get('firstName')?.toString(),
      lastName: formData.get('lastName')?.toString(),
      age: parseInt(formData.get('age')?.toString() ?? '-1'),
      iconUrl: formData.get('iconUrl')?.toString(),
      email: formData.get('email')?.toString(),
      password: formData.get('password')?.toString(),
      confirmPassword: formData.get('confirmPassword')?.toString(),
    }
    const registerData: SignUpDto = {user: userDto};
    signUp(registerData)
    .then((response: AuthResponse) => {
      dispatch(setAuthentication(true));
      setToken(response.token);
      router.push('/categories/my-categories');
    })
    .catch((error) => {
      let errorMsg = error.response.data;
      if (errorMsg === "")
        setErrorMessage("Status code: " + error.response.status);
      else
        setErrorMessage(errorMsg);
    });
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    size={'small'}
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    required
                    size={'small'}
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    size={'small'}
                    fullWidth
                    id="age"
                    label="Age"
                    name="age"
                    autoComplete="age"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    size={'small'}
                    fullWidth
                    id="iconUrl"
                    label="Avatar link"
                    name="iconUrl"
                    autoComplete="iconUrl"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    size={'small'}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    size={'small'}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    size={'small'}
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary"/>}
                    label="I want to receive marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {errorMessage && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {errorMessage}
                </Alert>
            )}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}