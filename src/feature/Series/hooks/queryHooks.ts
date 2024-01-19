import { gql, useMutation, useQuery } from "@apollo/client";
import { CreateFinancialInfoInput, CreateImageInput, CreateSeriesInput, DeleteMultipleSeriesByIdzParams, DeleteSeriesByIdParams, GetManagerSeriesForTableInput, GetManagerSeriesForTableOutput, GetSeriesDetailsByIdOutput, ImageIdOutput, SeriesIdParams, SuccessOutput, UpdateSeriesInput } from "zgaya.hub-client-types/lib";

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
  const [apiCaller, status] = useMutation<{ deleteSeriesById: SuccessOutput }, { param: DeleteSeriesByIdParams }>(gql`
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
      seriesError.handleError(error);
    }
  };

  status;

  return { mutateAsync, data: status.data?.deleteSeriesById, isPending: status.loading, ...status };
}

export function useDeleteMultipleSeriesByIdz() {
  const seriesError = useSeriesError();
  const [apiCaller, status] = useMutation<{ deleteMultipleSeriesByIdz: SuccessOutput }, { param: DeleteMultipleSeriesByIdzParams }>(
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
      seriesError.handleError(error);
    }
  };

  return { mutateAsync, data: status.data?.deleteMultipleSeriesByIdz, isPending: status.loading, ...status };
}

export function useUpdateSeries() {
  const seriesError = useSeriesError();

  const [apiCaller, status] = useMutation<{ updateSeries: SuccessOutput }, { param: SeriesIdParams; input: UpdateSeriesInput }>(
    gql`
      mutation ($param: SeriesIdParams!, $input: UpdateSeriesInput!) {
        updateSeries(SeriesIdParams: $param, UpdateSeriesInput: $input) {
          isSuccess
        }
      }
    `
  );

  const mutateAsync = async (param: SeriesIdParams, input: UpdateSeriesInput) => {
    try {
      const result = await apiCaller({ variables: { input, param } });
      return result.data?.updateSeries;
    } catch (error) {
      seriesError.handleError(error);
    }
  };

  return { mutateAsync, data: status.data?.updateSeries, isPending: status.loading, ...status };
}

export function useGetSeriesDetailsById(param: SeriesIdParams) {
  const status = useQuery<{ getSeriesDetailsById: GetSeriesDetailsByIdOutput }>(
    gql`
      query ($param: SeriesIdParams!) {
        getSeriesDetailsById(SeriesIdParams: $param) {
          ID
          originCountry
          originalLanguage
          genre
          status
          title
          plotSummary
          releaseDate
          imageUrl
          uploadDate
          netProfit
          budget
          revenue
          isFree
        }
      }
    `,
    {
      variables: { param },
    }
  );
  return { ...status, isLoading: status.loading, data: status.data?.getSeriesDetailsById };
}

export function useGetCineastsBySeriesId(param: GetCineastsBySeriesIdParams) {
  const seriesError = useSeriesError();

  const status = useQuery<{ getCineastsBySeriesId: CineastEntityType[] }>(
    gql`
      query ($param: GetCineastsBySeriesIdParams!) {
        getCineastsBySeriesId(GetCineastsBySeriesIdParams: $param) {
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
      variables: { param },
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
            uploadDate
            genre
            imageUrl
            originCountry
            originalLanguage
            plotSummary
            releaseDate
            status
            title
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

export function useCreateFinancialInfoForSeries() {
  const seriesError = useSeriesError();
  const [apiCaller, status] = useMutation<{ createFinancialInfoForSeries: SuccessOutput }, { param: SeriesIdParams; input: CreateFinancialInfoInput }>(
    gql`
      mutation ($param: SeriesIdParams!, $input: CreateFinancialInfoInput!) {
        createFinancialInfoForSeries(SeriesIdParams: $param, CreateFinancialInfoInput: $input) {
          isSuccess
        }
      }
    `
  );

  const mutateAsync = async (param: SeriesIdParams, input: CreateFinancialInfoInput) => {
    try {
      const result = await apiCaller({ variables: { param, input } });
      return result.data?.createFinancialInfoForSeries;
    } catch (error) {
      seriesError.handleError(error);
    }
  };

  return { mutateAsync, data: status.data?.createFinancialInfoForSeries, isPending: status.loading, ...status };
}
