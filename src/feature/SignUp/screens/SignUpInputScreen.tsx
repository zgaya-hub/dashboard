import { UnAuthScreenPaper } from "@/components/Paper";
import SignUpForm from "../components/SignUpForm";
import { SignUpFormDataInterface } from "../types";
import { useManagerLogin } from "../hooks/queryHooks";

export default function SignUpInputScreen() {
  const { mutateAsync: managerLoginMutateAsync } = useManagerLogin();
  const handleOnCallSignIn = async (formData: SignUpFormDataInterface) => {
    const result = await managerLoginMutateAsync(formData);
    console.log(result);
  };
  return (
    <UnAuthScreenPaper>
      <SignUpForm onSubmit={handleOnCallSignIn} />
    </UnAuthScreenPaper>
  );
}
