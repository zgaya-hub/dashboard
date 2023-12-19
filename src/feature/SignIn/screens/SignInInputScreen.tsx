import SignInForm from "../components/SignInForm";
import { useManagerSignIn } from "../hooks/queryHooks";
import { useAuthContext } from "@/context/AuthContext";
import Page from "@/components/Page";
import { ManagerSignInInput } from "../hooks/queryHooks.types";

export default function SignInInputScreen() {
  const { handleOnAuthenticate } = useAuthContext();
  const { mutateAsync: managerLoginMutateAsync } = useManagerSignIn();

  const handleOnSignIn = async (formData: ManagerSignInInput) => {
    const result = await managerLoginMutateAsync(formData);
    console.log(result);

    handleOnAuthenticate(result.managerSignIn.token);
  };

  return (
    <Page>
      <SignInForm onSubmit={handleOnSignIn} />
    </Page>
  );
}
