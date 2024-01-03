import Page from "@/components/Page";
import SignUpForm from "../components/SignUpForm";
import { SignUpFormDataInterface } from "../types";
import { useManagerSignIn } from "../hooks";

export default function SignUpInputScreen() {
  const { mutateAsync: managerLoginMutateAsync } = useManagerSignIn();
  const handleOnCallSignIn = async (formData: SignUpFormDataInterface) => {
    const result = managerLoginMutateAsync(formData);
    console.log(result);
  };
  return (
    <Page>
      <SignUpForm onSubmit={handleOnCallSignIn} />
    </Page>
  );
}
