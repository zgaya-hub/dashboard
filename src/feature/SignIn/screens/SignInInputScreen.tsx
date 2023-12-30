import SignInForm from "../components/SignInForm";
import { useManagerSignIn } from "../hooks/queryHooks";
import { useAuthContext } from "@/context/AuthContext";
import Page from "@/components/Page";
import { SignInFormFieldInterface } from "../types";

export default function SignInInputScreen() {
  const { handleOnAuthenticate } = useAuthContext();
  const { mutateAsync: managerLoginMutateAsync } = useManagerSignIn();

  const handleOnSignIn = async (input: SignInFormFieldInterface) => {
    const result = await managerLoginMutateAsync({ Email: input.email, Password: input.password });
    handleOnAuthenticate(result.token);
  };

  return (
    <Page>
      <SignInForm onSubmit={handleOnSignIn} isLoading={false} />
    </Page>
  );
}
