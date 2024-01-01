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
  GetMediaAdditionalInfoByMediaIdParams,
  GetMediaImageByMediaIdParams,
} from "./queryHooks.types";
import { gql, useMutation, useQuery } from "@apollo/client";

export function useCreateMediaImage() {
  const [apiCaller, status] = useMutation<{ createMediaImage: MediaImageIdOutput }, { input: CreateMediaImageInput }>(
    gql`
      mutation ($input: CreateMediaImageInput!) {
        createMediaImage(CreateMediaImageInput: $input) {
          ID
        }
      }
    `
  );
  const mutateAsync = async (input: CreateMediaImageInput) => {
    try {
      const result = await apiCaller({ variables: { input } });
      return result.data?.createMediaImage;
    } catch (error) {
      console.error(error);
    }
  };

  status;

  return { mutateAsync, data: status.data?.createMediaImage, isPending: status.loading, ...status };
}

export function useCreateSeries() {
  const [apiCaller, status] = useMutation<{ createSeries: CommonSuccessOutput }, { input: CreateSeriesInput }>(gql`
    mutation ($input: CreateSeriesInput!) {
      createSeries(CreateSeriesInput: $input) {
        isSuccess
      }
    }
  `);

  const mutateAsync = async (input: CreateSeriesInput) => {
    try {
      const result = await apiCaller({ variables: { input } });
      return result.data?.createSeries;
    } catch (error) {
      console.error(error);
    }
  };

  return { mutateAsync, data: status.data?.createSeries, isPending: status.loading, ...status };
}

export function useDeleteSeriesById() {
  const [apiCaller, status] = useMutation<{ deleteSeriesById: DeleteSeriesByIdOutput }, { param: DeleteSeriesByIdParams }>(gql`
    mutation ($param: DeleteSeriesByIdParams!) {
      deleteSeriesById(DeleteSeriesByIdParams: $param) {
        isSuccess
      }
    }
  `);
  const mutateAsync = async (param: DeleteSeriesByIdParams) => {
    try {
      const result = await apiCaller({ variables: { param } });
      return result.data?.deleteSeriesById;
    } catch (error) {
      console.error(error);
    }
  };

  status;

  return { mutateAsync, data: status.data?.deleteSeriesById, isPending: status.loading, ...status };
}

export function useDeleteMultipleSeriesByIdz() {
  const [apiCaller, status] = useMutation<{ deleteMultipleSeriesByIdz: DeleteMultipleSeriesByIdzOutput }, { param: DeleteMultipleSeriesByIdzParams }>(
    gql`
      mutation ($param: DeleteMultipleSeriesByIdzParams!) {
        deleteMultipleSeriesByIdz(DeleteMultipleSeriesByIdzParams: $param) {
          isSuccess
        }
      }
    `
  );
  const mutateAsync = async (param: DeleteMultipleSeriesByIdzParams) => {
    try {
      const result = await apiCaller({ variables: { param } });
      return result.data?.deleteMultipleSeriesByIdz;
    } catch (error) {
      console.error(error);
    }
  };

  return { mutateAsync, data: status.data?.deleteMultipleSeriesByIdz, isPending: status.loading, ...status };
}

export function useUpdateSeries() {
  const [apiCaller, status] = useMutation<{ updateSeries: UpdateSeriesOutput }, { param: UpdateSeriesParams; input: UpdateSeriesInput }>(
    gql`
      mutation ($param: UpdateSeriesParams!, $input: UpdateSeriesInput!) {
        updateSeries(UpdateSeriesParams: $param, UpdateSeriesInput: $input) {
          isSuccess
        }
      }
    `
  );
  const mutateAsync = async (param: UpdateSeriesParams, input: UpdateSeriesInput) => {
    try {
      const result = await apiCaller({ variables: { input, param } });
      return result.data?.updateSeries;
    } catch (error) {
      console.error(error);
    }
  };

  return { mutateAsync, data: status.data?.updateSeries, isPending: status.loading, ...status };
}

export function useGetMediaBasicInfoByMediaId(param: GetMediaBasicInfoByMediaIdParams) {
  const status = useQuery<{ getMediaBasicInfoByMediaId: MediaBasicInfoEntityType }>(
    gql`
      query ($param: GetMediaBasicInfoByMediaIdParams!) {
        getMediaBasicInfoByMediaId(GetMediaBasicInfoByMediaIdParams: $param) {
          ID
          title
          plotSummary
          releaseDate
        }
      }
    `,
    {
      variables: { param },
    }
  );
  return { ...status, isLoading: status.loading, data: status.data?.getMediaBasicInfoByMediaId };
}

export function useGetMediaAdditionalInfoByMediaId(param: GetMediaAdditionalInfoByMediaIdParams) {
  const status = useQuery<{ getMediaAdditionalInfoByMediaId: MediaAdditionalInfoEntityType }>(
    gql`
      query ($param: GetMediaAdditionalInfoByMediaIdParams!) {
        getMediaAdditionalInfoByMediaId(GetMediaAdditionalInfoByMediaIdParams: $param) {
          ID
          originCountry
          originalLanguage
          genre
          status
        }
      }
    `,
    {
      variables: { param },
    }
  );
  return { ...status, isLoading: status.loading, data: status.data?.getMediaAdditionalInfoByMediaId };
}

export function useGetMediaImageByMediaId(param: GetMediaImageByMediaIdParams) {
  const status = useQuery<{ getMediaImageByMediaId: MediaImageEntityType }>(
    gql`
      query ($param: GetMediaImageByMediaIdParams!) {
        getMediaImageByMediaId(GetMediaImageByMediaIdParams: $param) {
          ID
          variant
          url
        }
      }
    `,
    {
      variables: { param },
    }
  );
  return { ...status, isLoading: status.loading, data: status.data?.getMediaImageByMediaId };
}

export function useGetManagerSeriesForTable(input: GetManagerSeriesForTableInput) {
  const status = useQuery<{ getManagerSeriesForTable: GetManagerSeriesForTableOutput }, { input: GetManagerSeriesForTableInput }>(
    gql`
      query ($input: GetManagerSeriesForTableInput!) {
        getManagerSeriesForTable(GetManagerSeriesForTableInput: $input) {
          totalRecords
          seriesList {
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
      }
    `,
    {
      variables: { input },
    }
  );
  return { ...status, isLoading: status.loading, data: status.data?.getManagerSeriesForTable };
}
