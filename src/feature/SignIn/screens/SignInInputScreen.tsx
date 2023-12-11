import { UnAuthScreenPage } from "@/components/Page";
import SignInForm from "../components/SignInForm";
import { SignInFormDataInterface } from "../types";
import { useManagerSignIn } from "../hooks/queryHooks";
import { useAuthContext } from "@/context/AuthContext";

export default function SignInInputScreen() {
  const { handleOnAuthenticate } = useAuthContext();
  const { mutateAsync: managerLoginMutateAsync } = useManagerSignIn();

  const handleOnCallSignIn = async (formData: SignInFormDataInterface) => {
    const result = await managerLoginMutateAsync(formData);
    console.log(result);

    handleOnAuthenticate(result.managerSignIn.token);
  };

  return (
    <UnAuthScreenPage>
      <SignInForm onSubmit={handleOnCallSignIn} />
    </UnAuthScreenPage>
  );
}
