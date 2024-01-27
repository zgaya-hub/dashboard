import { gql, useMutation, useQuery } from "@apollo/client";
import { CreateImageInput, CreateSeriesInput, DeleteMultipleSeriesByIdzParams, DeleteSeriesByIdParams, GetManagerSeriesForTableInput, GetManagerSeriesForTableOutput, GetSeasonBySeriesIdOutput, GetSeriesDetailsByIdOutput, ImageIdOutput, SeriesIdParams, SuccessOutput, UpdateSeriesInput } from "zgaya.hub-client-types/lib";

import { useSeriesError } from "./errorHooks";
import { GetCineastsBySeriesIdParams } from "./queryHooks.types";

export function useCreateImage() {
  const seriesError = useSeriesError();
  const [apiCaller, status] = useMutation<{ createImage: ImageIdOutput }, { input: CreateImageInput }>(
    gql`
      mutation ($input: CreateImageInput!) {
        createImage(CreateImageInput: $input) {
          ID
        }
      }
    `
  );

  const mutateAsync = async (input: CreateImageInput) => {
    try {
      const result = await apiCaller({ variables: { input } });
      return result.data?.createImage;
    } catch (error) {
      seriesError.handleError(error);
    }
  };

  return { mutateAsync, data: status.data?.createImage, isPending: status.loading, ...status };
}

export function useCreateSeries() {
  const seriesError = useSeriesError();
  const [apiCaller, status] = useMutation<{ createSeries: SuccessOutput }, { input: CreateSeriesInput }>(gql`
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
      seriesError.handleError(error);
    }
  };

  return { mutateAsync, data: status.data?.createSeries, isPending: status.loading, ...status };
}

export function useDeleteSeriesById() {
  const seriesError = useSeriesError();
  const [apiCaller, status] = useMutation<{ deleteSeriesById: SuccessOutput }, { params: DeleteSeriesByIdParams }>(gql`
    mutation ($params: DeleteSeriesByIdParams!) {
      deleteSeriesById(DeleteSeriesByIdParams: $params) {
        isSuccess
      }
    }
  `);

  const mutateAsync = async (params: DeleteSeriesByIdParams) => {
    try {
      const result = await apiCaller({ variables: { params } });
      return result.data?.deleteSeriesById;
    } catch (error) {
      seriesError.handleError(error);
    }
  };

  status;

  return { mutateAsync, data: status.data?.deleteSeriesById, isPending: status.loading, ...status };
}

export function useDeleteMultipleSeriesByIdz() {
  const seriesError = useSeriesError();
  const [apiCaller, status] = useMutation<{ deleteMultipleSeriesByIdz: SuccessOutput }, { params: DeleteMultipleSeriesByIdzParams }>(
    gql`
      mutation ($params: DeleteMultipleSeriesByIdzParams!) {
        deleteMultipleSeriesByIdz(DeleteMultipleSeriesByIdzParams: $params) {
          isSuccess
        }
      }
    `
  );

  const mutateAsync = async (params: DeleteMultipleSeriesByIdzParams) => {
    try {
      const result = await apiCaller({ variables: { params } });
      return result.data?.deleteMultipleSeriesByIdz;
    } catch (error) {
      seriesError.handleError(error);
    }
  };

  return { mutateAsync, data: status.data?.deleteMultipleSeriesByIdz, isPending: status.loading, ...status };
}

export function useUpdateSeries() {
  const seriesError = useSeriesError();

  const [apiCaller, status] = useMutation<{ updateSeries: SuccessOutput }, { params: SeriesIdParams; input: UpdateSeriesInput }>(
    gql`
      mutation ($params: SeriesIdParams!, $input: UpdateSeriesInput!) {
        updateSeries(SeriesIdParams: $params, UpdateSeriesInput: $input) {
          isSuccess
        }
      }
    `
  );

  const mutateAsync = async (params: SeriesIdParams, input: UpdateSeriesInput) => {
    try {
      const result = await apiCaller({ variables: { input, params } });
      return result.data?.updateSeries;
    } catch (error) {
      seriesError.handleError(error);
    }
  };

  return { mutateAsync, data: status.data?.updateSeries, isPending: status.loading, ...status };
}

export function useGetSeriesDetailsById(params: SeriesIdParams) {
  const status = useQuery<{ getSeriesDetailsById: GetSeriesDetailsByIdOutput }>(
    gql`
      query ($params: SeriesIdParams!) {
        getSeriesDetailsById(SeriesIdParams: $params) {
          ID
          originCountry
          originalLanguage
          genre
          status
          title
          plotSummary
          releaseDate
          backdropImageUrl
          uploadDate
          isFree
        }
      }
    `,
    {
      variables: { params },
    }
  );
  return { ...status, isLoading: status.loading, data: status.data?.getSeriesDetailsById };
}

export function useGetCineastsBySeriesId(params: GetCineastsBySeriesIdParams) {
  const seriesError = useSeriesError();

  const status = useQuery<{ getCineastsBySeriesId: CineastEntityType[] }>(
    gql`
      query ($params: GetCineastsBySeriesIdParams!) {
        getCineastsBySeriesId(GetCineastsBySeriesIdParams: $params) {
          fullName
          profession
          dateOfBirth
          bio
          gender
          country
          award
        }
      }
    `,
    {
      variables: { params },
    }
  );

  if (status.error) {
    seriesError.handleError(status.error);
  }

  return { ...status, isLoading: status.loading, data: status.data?.getCineastsBySeriesId };
}

export function useGetManagerSeriesForTable(input: GetManagerSeriesForTableInput) {
  const seriesError = useSeriesError();
  const status = useQuery<{ getManagerSeriesForTable: GetManagerSeriesForTableOutput }, { input: GetManagerSeriesForTableInput }>(
    gql`
      query ($input: GetManagerSeriesForTableInput!) {
        getManagerSeriesForTable(GetManagerSeriesForTableInput: $input) {
          totalRecords
          seriesList {
            ID
            status
            title
            plotSummary
            releaseDate
            backdropImageUrl
            likeCount
            avarageRating
            uploadDate
          }
        }
      }
    `,
    {
      variables: { input },
    }
  );

  if (status.error) {
    seriesError.handleError(status.error);
  }

  return { ...status, isLoading: status.loading, data: status.data?.getManagerSeriesForTable };
}

export function useGetSeasonBySeriesId(params: SeriesIdParams) {
  const seriesError = useSeriesError();

  const status = useQuery<{ getSeasonBySeriesId: GetSeasonBySeriesIdOutput[] }, { params: SeriesIdParams }>(
    gql`
      query ($params: SeriesIdParams!) {
        getSeasonBySeriesId(SeriesIdParams: $params) {
          ID
          plotSummary
          title
          releaseDate
          number
          backdropImageUrl
        }
      }
    `,
    {
      variables: { params },
    }
  );

  if (status.error) {
    seriesError.handleError(status.error);
  }

  return { ...status, isLoading: status.loading, data: status.data?.getSeasonBySeriesId };
}
