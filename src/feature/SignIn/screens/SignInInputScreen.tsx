import SignInForm from "../components/SignInForm";
import { SignInFormDataInterface } from "../types";
import { useManagerSignIn } from "../hooks/queryHooks";
import { useAuthContext } from "@/context/AuthContext";
import Page from "@/components/Page";

export default function SignInInputScreen() {
  const { handleOnAuthenticate } = useAuthContext();
  const { mutateAsync: managerLoginMutateAsync } = useManagerSignIn();

  const handleOnCallSignIn = async (formData: SignInFormDataInterface) => {
    const result = await managerLoginMutateAsync(formData);
    console.log(result);

    handleOnAuthenticate(result.managerSignIn.token);
  };

  return (
    <Page>
      <SignInForm onSubmit={handleOnCallSignIn} />
    </Page>
  );
}
