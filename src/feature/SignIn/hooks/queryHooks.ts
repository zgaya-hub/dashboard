import { gqlRequest } from "@/api/gqlRequest";
import { useMutation } from "@tanstack/react-query";

export function useManagerLogin() {
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
  });
}
