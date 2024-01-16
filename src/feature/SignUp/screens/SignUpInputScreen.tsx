import Page from "@/components/Page";
import SignUpForm from "../components/SignUpForm";
import { SignUpFormDataInterface } from "../types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import useFirebase from "@/context/FirebaseContext";

export default function SignUpInputScreen() {
  const { auth } = useFirebase();
  const handleOnCallSignIn = async (formData: SignUpFormDataInterface) => {
    const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
    console.log(result);
  };
  return (
    <Page>
      <SignUpForm onSubmit={handleOnCallSignIn} />
    </Page>
  );
}
