import { CssBaseline, Stack, Paper, Typography, Link } from "@mui/material";
import Button from "@/components/Button";
import { Form, TextField } from "@/components/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignInFormFieldInterface } from "../types";


interface SignInFormProps {
  onSubmit: (formData: SignInFormFieldInterface) => void;
  isLoading: boolean;
}

export default function SignInForm({ onSubmit, isLoading }: SignInFormProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignInFormFieldInterface>({
    resolver: yupResolver(validationSchema),
  });

  const handleOnSubmit = (data: SignInFormFieldInterface) => {
    onSubmit(data);
  };

  return (
    <Stack component={Paper} elevation={3} p={3} sx={{ width: 400, margin: "auto" }}>
      <CssBaseline />
      <Typography variant="h5" align="center" mb={2}>
        Sign In to Facebook
      </Typography>
      <Form onSubmit={handleSubmit(handleOnSubmit)} rowGap={2}>
        <TextField register={register} name="email" label="Email Address" error={!!errors.password} helperText={errors.email?.message} autoFocus />
        <TextField register={register} name="password" label="Password" type="password" error={!!errors.password} helperText={errors.password?.message} />
        <Button loading={isLoading} type="submit" variant="contained" fullWidth>
          Sign In
        </Button>
      </Form>
      <Typography variant="body2" mt={2} textAlign="center">
        <Link href="#" color="primary">
          Forgot password?
        </Link>
      </Typography>
    </Stack>
  );
}

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});
