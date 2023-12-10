import { gqlRequest } from "@/api/gqlRequest";
import useGqlError, { ErrorResponse } from "@/context/GqlErrorContext";
import { useMutation } from "@tanstack/react-query";

export function useManagerLogin() {
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
    onError: (error: ErrorResponse) => {
      showGqlError(error);
    },
  });
}
