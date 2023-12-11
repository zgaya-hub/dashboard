import React from "react";
import { CssBaseline, Stack, Paper, Typography, Link } from "@mui/material";
import { SimpleTextInput } from "@/components/Form";
import Button from "@/components/Button";
import { SignInFormDataInterface } from "../types";

interface SignInFormProps {
  onSubmit: (formData: SignInFormDataInterface) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: SignInFormDataInterface = {
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
        <SimpleTextInput id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
        <SimpleTextInput name="password" label="Password" type="password" id="password" autoComplete="current-password" />
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

export default SignInForm;
