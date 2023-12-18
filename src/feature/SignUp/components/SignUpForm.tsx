import React from "react";
import { CssBaseline, Stack, Paper, Typography, Link, TextField } from "@mui/material";
import Button from "@/components/Button";
import { SignUpFormDataInterface } from "../types";

interface SignUpFormProps {
  onSubmit: (formData: SignUpFormDataInterface) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: SignUpFormDataInterface = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };
    onSubmit(formData);
  };

  return (
    <Stack component={Paper} elevation={3} p={3} sx={{ width: 400, margin: "auto" }}>
      <CssBaseline />
      <Typography variant="h5" align="center" mb={2}>
        Sign In to Facebook
      </Typography>
      <Stack component="form" noValidate onSubmit={handleSubmit} spacing={2}>
        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
        <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
        <Button type="submit" variant="contained" fullWidth>
          Sign In
        </Button>
      </Stack>
      <Typography variant="body2" mt={2} textAlign="center">
        <Link href="#" color="primary">
          Forgot password?
        </Link>
      </Typography>
    </Stack>
  );
};

export default SignUpForm;
