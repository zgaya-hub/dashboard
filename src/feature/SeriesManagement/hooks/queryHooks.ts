import { gqlRequest } from "@/api/gqlRequest";
import useGqlError from "@/context/GqlErrorContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateMediaImageInput,
  MediaImageIdOutput,
  CreateSeriesInput,
  DeleteMultipleSeriesByIdzOutput,
  DeleteMultipleSeriesByIdzParams,
  DeleteSeriesByIdOutput,
  DeleteSeriesByIdParams,
  GetManagerSeriesForTableInput,
  GetManagerSeriesForTableOutput,
  UpdateSeriesInput,
  UpdateSeriesOutput,
  UpdateSeriesParams,
  GetMediaBasicInfoByMediaIdParams,
} from "./queryHooks.types";

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
              genre
              mediaImageUrl
              originCountry
              originalLanguage
              plotSummary
              releaseDate
              status
              title
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
    mutationFn: async (param: DeleteSeriesByIdParams) => {
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
    mutationFn: async (param: DeleteMultipleSeriesByIdzParams) => {
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

export function useUpdateSeries() {
  const { showGqlError } = useGqlError();

  return useMutation({
    mutationFn: async (input: { param: UpdateSeriesParams; input: UpdateSeriesInput }) => {
      const result = await gqlRequest<{ updateSeries: UpdateSeriesOutput }>(
        `mutation($param: UpdateSeriesParams!, $input: UpdateSeriesInput!) {
          updateSeries(UpdateSeriesParams: $param, UpdateSeriesInput: $input) {
            isSuccess
          }
        }`,
        { param: input.param, input: input.input }
      );
      return result.updateSeries;
    },
    onError: (error) => {
      showGqlError(error.response);
    },
  });
}

export function useGetMediaBasicInfoByMediaId(param: GetMediaBasicInfoByMediaIdParams) {
  return useQuery({
    queryKey: [param.MediaId],
    queryFn: async () => {
      const result = await gqlRequest<{ getMediaBasicInfoByMediaId: MediaBasicInfoEntityType }>(
        `query($param: GetMediaBasicInfoByMediaIdParams!) {
          getMediaBasicInfoByMediaId(GetMediaBasicInfoByMediaIdParams: $param) {
            ID
            title
            plotSummary
            releaseDate
          }
        }`,
        { param }
      );
      return result.getMediaBasicInfoByMediaId;
    },
  });
}
