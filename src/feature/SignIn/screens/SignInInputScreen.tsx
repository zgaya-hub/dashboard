import { UnAuthScreenPaper } from "@/components/Paper";
import SignInForm from "../components/SignInForm";
import { SignInFormDataInterface } from "../types";
import { useManagerLogin } from "../hooks/queryHooks";
import { useAuthContext } from "@/context/AuthContext";

export default function SignInInputScreen() {
  const { handleOnAuthenticate } = useAuthContext();
  const { mutateAsync: managerLoginMutateAsync } = useManagerLogin();

  const handleOnCallSignIn = async (formData: SignInFormDataInterface) => {
    const result = await managerLoginMutateAsync(formData);
    console.log(result, );
    
    handleOnAuthenticate(result.managerSignIn.token);
  };

  return (
    <UnAuthScreenPaper>
      <SignInForm onSubmit={handleOnCallSignIn} />
    </UnAuthScreenPaper>
  );
}
