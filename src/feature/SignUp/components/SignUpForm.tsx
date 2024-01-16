import React from "react";
import { CssBaseline, Stack, Paper, Typography } from "@mui/material";
import Button from "@/components/Button";
import { SignUpFormDataInterface } from "../types";
import { TextField } from "@/components/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface SignUpFormProps {
  onSubmit: (formData: SignUpFormDataInterface) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const { handleSubmit, register: formRegister } = useForm<SignUpFormDataInterface>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <Stack component={Paper} elevation={3} p={3} sx={{ width: 400, margin: "auto" }}>
      <CssBaseline />
      <Typography variant="h5" align="center" mb={2}>
        Register
      </Typography>
      <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} spacing={2}>
        <TextField register={formRegister} fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
        <TextField register={formRegister} fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
        <Button type="submit" variant="contained" fullWidth>
          Register
        </Button>
      </Stack>
    </Stack>
  );
};

export default SignUpForm;

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});
