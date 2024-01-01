import { ManagerSignInInput, ManagerSignInOutput } from "./queryHooks.types";
import { gql, useMutation } from "@apollo/client";

export function useManagerSignIn() {
  const [apiCaller, status] = useMutation<{ managerSignIn: ManagerSignInOutput }, { input: ManagerSignInInput }>(
    gql`
      mutation ManagerSignIn($input: ManagerSignInInput!) {
        managerSignIn(ManagerSignInInput: $input) {
          token
        }
      }
    `
  );
  const mutateAsync = async (input: ManagerSignInInput) => {
    try {
      const result = await apiCaller({ variables: { input } });
      return result.data?.managerSignIn;
    } catch (error) {
      console.error(error);
    }
  };

  return { mutateAsync, data: status.data?.managerSignIn, isPending: status.loading, ...status };
}
