import { gqlRequest } from "@/api/gqlRequest";
import useGqlError from "@/context/GqlErrorContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateMediaImageInput,
  CreateMediaImageOutput,
  CreateSeriesInput,
  DeleteMultipleSeriesByIdzInput,
  DeleteMultipleSeriesByIdzOutput,
  DeleteSeriesByIdInput,
  DeleteSeriesByIdOutput,
  GetManagerSeriesForTableInput,
  GetManagerSeriesForTableOutput,
} from "./queryHooks.types";

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

export function useGetManagerSeriesForTable(input: GetManagerSeriesForTableInput) {
  return useQuery({
    queryKey: [""],
    queryFn: async () => {
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
  });
}

export function useDeleteSeriesById() {
  const { showGqlError } = useGqlError();
  return useMutation({
    mutationFn: async (param: DeleteSeriesByIdInput) => {
      const result = await gqlRequest<{ deleteSeriesById: DeleteSeriesByIdOutput }>(
        `mutation($param: DeleteSeriesByIdParams!) {
          deleteSeriesById(DeleteSeriesByIdParams: $param) {
            isSuccess
          }
        }`,
        { param }
      );
      return result.deleteSeriesById;
    },
    onError: (error) => {
      showGqlError(error.response);
    },
  });
}

export function useDeleteMultipleSeriesByIdz() {
  const { showGqlError } = useGqlError();
  return useMutation({
    mutationFn: async (param: DeleteMultipleSeriesByIdzInput) => {
      const result = await gqlRequest<{ deleteMultipleSeriesByIdz: DeleteMultipleSeriesByIdzOutput }>(
        `mutation($param: DeleteMultipleSeriesByIdzParams!) {
          deleteMultipleSeriesByIdz(DeleteMultipleSeriesByIdzParams: $param) {
            isSuccess
          }
        }`,
        { param }
      );
      return result.deleteMultipleSeriesByIdz;
    },
    onError: (error) => {
      showGqlError(error.response);
    },
  });
}
