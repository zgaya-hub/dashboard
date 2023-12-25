import { gqlRequest } from "@/api/gqlRequest";
import useGqlError from "@/context/GqlErrorContext";
import { useMutation } from "@tanstack/react-query";
import { CreateMediaImageInput, CreateMediaImageOutput, CreateSeriesInput } from "./queryHooks.types";

export function useCreateMediaImage() {
  const { showGqlError } = useGqlError();
  return useMutation({
    mutationFn: async (input: CreateMediaImageInput) => {
      return gqlRequest<{ createMediaImage: CreateMediaImageOutput }>(
        `mutation($input: CreateMediaImageInput!) {
          createMediaImage(CreateMediaImageInput: $input) {
            mediaImageId
          }
        }`,
        { input }
      );
    },
    onError: (error) => {
      showGqlError(error.response);
    },
  });
}

export function useCreateSeries() {
  const { showGqlError } = useGqlError();
  return useMutation({
    mutationFn: async (input: CreateSeriesInput) => {
      return gqlRequest<{ createSeries: CommonSuccessOutput }>(
        `mutation($input: CreateSeriesInput!) {
          createSeries(CreateSeriesInput: $input) {
            isSuccess
          }
        }`,
        { input }
      );
    },
    onError: (error) => {
      showGqlError(error.response);
    },
  });
}
