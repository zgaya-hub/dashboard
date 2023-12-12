import { gqlRequest } from "@/api/gqlRequest";
import useGqlError, { ErrorResponse } from "@/context/GqlErrorContext";
import { useMutation } from "@tanstack/react-query";
import { GetUploadVideoSignedUrlInput, GetUploadVideoSignedUrlOutput, UploadVideoOnAwsS3Input } from "./queryHooks.types";

export function useGetUploadVideoSignedUrl() {
  const { showGqlError } = useGqlError();
  return useMutation({
    mutationFn: async (input: GetUploadVideoSignedUrlInput) => {
      return gqlRequest<{ getUploadVideoSignedUrl: GetUploadVideoSignedUrlOutput }>(
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
      showGqlError(error.response);
    },
  });
}

export function useUploadVideoOnAwsS3() {
  const { showGqlError } = useGqlError();

  return useMutation({
    mutationFn: async (input: UploadVideoOnAwsS3Input) => {
      fetch(input.SignedUrl, {
        method: "PUT",
        body: input.VideoBlob,
        headers: {
          "Content-Type": "video/*",
        },
      });
    },
    onError: (error: ErrorResponse) => {
      showGqlError(error);
    },
  });
}
