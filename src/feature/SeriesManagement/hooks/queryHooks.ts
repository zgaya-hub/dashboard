import { gqlRequest } from "@/api/gqlRequest";
import useGqlError from "@/context/GqlErrorContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateMediaImageInput, CreateMediaImageOutput, CreateSeriesInput, GetManagerSeriesForTableInput, GetManagerSeriesForTableOutput } from "./queryHooks.types";

export function useCreateMediaImage() {
  const { showGqlError } = useGqlError();
  return useMutation({
    mutationFn: async (input: CreateMediaImageInput) => {
      const result = await gqlRequest<{ createMediaImage: CreateMediaImageOutput }>(
        `mutation($input: CreateMediaImageInput!) {
          createMediaImage(CreateMediaImageInput: $input) {
            mediaImageId
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

export function useGetManagerSeriesForTable() {
  const { showGqlError } = useGqlError();
  return useMutation({
    mutationFn: async (input: GetManagerSeriesForTableInput) => {
      const result = await gqlRequest<{ getManagerSeriesForTable: GetManagerSeriesForTableOutput }>(
        `mutation($input: GetManagerSeriesForTableInput!) {
          getManagerSeriesForTable(GetManagerSeriesForTableInput: $input) {
            totalRecords
            seriesList{
              ID
              createdAt
              updatedAt
              mediaGenre
              mediaImageUrl
              mediaOriginCountry
              mediaOriginalLanguage
              mediaPlotSummary
              mediaReleaseDate
              mediaStatus
              mediaTitle
            }
          }
        }`,
        { input }
      );
      return result.getManagerSeriesForTable;
    },
    onError: (error) => {
      showGqlError(error.response);
    },
  });
}
