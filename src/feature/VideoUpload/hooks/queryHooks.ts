import { gqlRequest } from "@/api/gqlRequest";
import { useMutation } from "@tanstack/react-query";

export function useGetUploadVideoSignedUrl() {
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
        input
      );
    },
  });
}
