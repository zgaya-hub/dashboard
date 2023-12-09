import { gqlRequest } from "@/api/gqlRequest";
import useGqlError from "@/context/GqlErrorContext";
import { useMutation } from "@tanstack/react-query";

export function useGetUploadVideoSignedUrl() {
  const { showGqlError } = useGqlError();
  return useMutation({
    mutationFn: async (input: GetUploadVideoSignedUrlInput) => {
      return gqlRequest<GetUploadVideoSignedUrlOutput>(
        `
          mutation($input: GetUploadVideoSignedUrlInput!) {
            getUploadVideoSignedUrl(GetUploadVideoSignedUrlInput: $input) {
              SignedUrl
              SignedUrlKeyId
              VideoId
            }
          }
        `,
        { input }
      );
    },
    onError: (error) => {
      showGqlError(error);
    },
  });
}
