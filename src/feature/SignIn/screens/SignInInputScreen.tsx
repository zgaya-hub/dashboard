import SignInForm from "../components/SignInForm";
import { useAuthContext } from "@/context/AuthContext";
import Page from "@/components/Page";
import { SignInFormFieldInterface } from "../types";
import { signInWithEmailAndPassword } from "firebase/auth";
import useFirebase from "@/context/FirebaseContext";

export default function SignInInputScreen() {
  const { auth } = useFirebase();
  const { handleOnAuthenticate } = useAuthContext();

  const handleOnSignIn = async (input: SignInFormFieldInterface) => {
    const result = await signInWithEmailAndPassword(auth, input.email, input.password);
    console.log(result);

    handleOnAuthenticate(await result.user.getIdToken());
  };

  return (
    <Page>
      <SignInForm onSubmit={handleOnSignIn} isLoading={false} />
    </Page>
  );
}
