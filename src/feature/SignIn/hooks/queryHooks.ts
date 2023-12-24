import { gqlRequest } from "@/api/gqlRequest";
import useGqlError from "@/context/GqlErrorContext";
import { useMutation } from "@tanstack/react-query";
import { ManagerSignInInput, ManagerSignInOutput } from "./queryHooks.types";

export function useManagerSignIn() {
  const { showGqlError } = useGqlError();
  return useMutation({
    mutationFn: async (input: ManagerSignInInput) => {
      return gqlRequest<ManagerSignInOutput>(
        `
          mutation ManagerSignIn($input: ManagerSignInInput!) {
            managerSignIn(ManagerSignInInput: $input) {
              token
            }
          }
        `,
        { input }
      );
    },
    onError: (error) => {
      showGqlError(error.response);
    },
  });
}
