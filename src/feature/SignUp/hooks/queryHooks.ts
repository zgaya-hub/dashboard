import { gql, useMutation } from "@apollo/client";
import { ManagerSignUpInput, ManagerSignUpOutput } from "./queryHooks.types";

export function useManagerSignIn() {
  const [apiCaller, status] = useMutation<{ managerSignIn: ManagerSignUpOutput }, { input: ManagerSignUpInput }>(
    gql`
      mutation ManagerSignIn($input: ManagerSignInInput!) {
        managerSignIn(ManagerSignInInput: $input) {
          token
        }
      }
    `
  );
  const mutateAsync = (input: ManagerSignUpInput) => {
    apiCaller({ variables: { input } });
  };

  return { mutateAsync, data: status.data?.managerSignIn, isPending: status.loading, ...status };
}
