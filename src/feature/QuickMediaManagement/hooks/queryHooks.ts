import { gqlRequest } from "@/api/gqlRequest";
import useGqlError from "@/context/GqlErrorContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateMediaImageInput, MediaImageIdOutput, CreateSeasonInput, CreateSeriesInput, GetNextSeasonNumberOutput, GetNextSeasonNumberParams } from "./queryHooks.types";

export function useCreateMediaImage() {
  const { showGqlError } = useGqlError();
  return useMutation({
    mutationFn: async (input: CreateMediaImageInput) => {
      const result = await gqlRequest<{ createMediaImage: MediaImageIdOutput }>(
        `mutation($input: CreateMediaImageInput!) {
          createMediaImage(CreateMediaImageInput: $input) {
            ID
          }
        }`,
        { input }
      );
      return result.createMediaImage;
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
      const result = await gqlRequest<{ createSeries: CommonSuccessOutput }>(
        `mutation($input: CreateSeriesInput!) {
          createSeries(CreateSeriesInput: $input) {
            isSuccess
          }
        }`,
        { input }
      );
      return result.createSeries;
    },
    onError: (error) => {
      showGqlError(error.response);
    },
  });
}

export function useGetNextSeasonNumber(param: GetNextSeasonNumberParams) {
  return useQuery({
    queryKey: [param.SeriesId],
    queryFn: async () => {
      const result = await gqlRequest<{ getNextSeasonNumber: GetNextSeasonNumberOutput }>(
        `query($param: GetNextSeasonNumberParams!) {
          getNextSeasonNumber(GetNextSeasonNumberParams: $param) {
            number
          }
        }`,
        { param }
      );
      return result.getNextSeasonNumber;
    },
  });
}

export function useCreateSeason() {
  const { showGqlError } = useGqlError();
  return useMutation({
    mutationFn: async (input: CreateSeasonInput) => {
      const result = await gqlRequest<{ createSeason: CommonSuccessOutput }>(
        `mutation($input: CreateSeasonInput!) {
          createSeason(CreateSeasonInput: $input) {
            isSuccess
          }
        }`,
        { input }
      );
      return result.createSeason;
    },
    onError: (error) => {
      showGqlError(error.response);
    },
  });
}
