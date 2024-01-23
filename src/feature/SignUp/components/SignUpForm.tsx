import { CssBaseline, Stack, Paper, Typography } from "@mui/material";
import Button from "@/components/Button";
import { SignUpFormDataInterface } from "../types";
import { Form, TextField } from "@/components/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useFirebase from "@/context/FirebaseContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export default function SignUpForm() {
  const { auth } = useFirebase();
  const { handleSubmit, register: formRegister } = useForm<SignUpFormDataInterface>({
    resolver: yupResolver(validationSchema),
  });

  const handleOnSubmit = async (formData: SignUpFormDataInterface) => {
    const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    console.log(result);
  };


  const handleOnRegisterWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      // handle success
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // handle error
    }
  };

  return (
    <Stack component={Paper} elevation={3} p={3} sx={{ width: 400, margin: "auto" }}>
      <CssBaseline />
      <Typography variant="h5" align="center" mb={2}>
        Register
      </Typography>
      <Form onSubmit={handleSubmit(handleOnSubmit)} spacing={2}>
        <TextField register={formRegister} fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
        <TextField register={formRegister} fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
        <Button type="submit" variant="contained" fullWidth>
          Register
        </Button>
      </Form>
      <Button onClick={handleOnRegisterWithGoogle}>Google register</Button>
    </Stack>
  );
}

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});
