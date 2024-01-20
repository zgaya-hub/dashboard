import { gql, useMutation, useQuery } from "@apollo/client";
import { ChangeImageInput, CreateImageInput, CreateSeasonInput, CreateSeriesInput, GetNextSeasonNumberOutput, GetNextSeasonNumberParams, GetSeriesDetailsByIdOutput, ImageIdOutput, ImageMediaIdParams, SeriesIdParams, SuccessOutput, UpdateSeriesInput } from "zgaya.hub-client-types/lib";

import { CreateCineastInput } from "./queryHooks.types";
import { useErrorHandler } from "./errorHooks";

export function useCreateImage() {
  const { handleError } = useErrorHandler();

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
      handleError(error);
    }
  };

  return { mutateAsync, data: status.data?.createImage, isPending: status.loading, ...status };
}

export function useChangeImageByMediaId() {
  const { handleError } = useErrorHandler();

  const [apiCaller, status] = useMutation<{ changeImageByMediaId: SuccessOutput }, { params: ImageMediaIdParams; input: ChangeImageInput }>(
    gql`
      mutation ($params: ImageMediaIdParams!, $input: ChangeImageInput!) {
        changeImageByMediaId(ImageMediaIdParams: $params, ChangeImageInput: $input) {
          isSuccess
        }
      }
    `
  );

  const mutateAsync = async (params: ImageMediaIdParams, input: ChangeImageInput) => {
    try {
      const result = await apiCaller({ variables: { params, input } });
      return result.data?.changeImageByMediaId;
    } catch (error) {
      handleError(error);
    }
  };

  return { mutateAsync, data: status.data?.changeImageByMediaId, isPending: status.loading, ...status };
}

export function useCreateSeries() {
  const { handleError } = useErrorHandler();

  const [apiCaller, status] = useMutation<{ createSeries: SuccessOutput }, { input: CreateSeriesInput }>(
    gql`
      mutation ($input: CreateSeriesInput!) {
        createSeries(CreateSeriesInput: $input) {
          isSuccess
        }
      }
    `
  );

  const mutateAsync = async (input: CreateSeriesInput) => {
    try {
      const result = await apiCaller({ variables: { input } });
      return result.data?.createSeries;
    } catch (error) {
      handleError(error);
    }
  };

  return { mutateAsync, data: status.data?.createSeries, isPending: status.loading, ...status };
}

export function useGetNextSeasonNumber(params: GetNextSeasonNumberParams) {
  const { handleError } = useErrorHandler();

  const status = useQuery<{ getNextSeasonNumber: GetNextSeasonNumberOutput }>(
    gql`
      query ($params: GetNextSeasonNumberParams!) {
        getNextSeasonNumber(GetNextSeasonNumberParams: $params) {
          number
        }
      }
    `,
    {
      variables: { params },
    }
  );

  if (status.error) {
    handleError(status.error);
  }

  return { ...status, isLoading: status.loading, data: status.data?.getNextSeasonNumber };
}

export function useCreateSeason() {
  const { handleError } = useErrorHandler();

  const [apiCaller, status] = useMutation<{ createSeason: SuccessOutput }, { input: CreateSeasonInput }>(
    gql`
      mutation ($input: CreateSeasonInput!) {
        createSeason(CreateSeasonInput: $input) {
          isSuccess
        }
      }
    `
  );

  const mutateAsync = async (input: CreateSeasonInput) => {
    try {
      const result = await apiCaller({ variables: { input } });
      return result.data?.createSeason;
    } catch (error) {
      handleError(error);
    }
  };

  return { mutateAsync, data: status.data?.createSeason, isPending: status.loading, ...status };
}

export function useCreateCineast() {
  const { handleError } = useErrorHandler();

  const [apiCaller, status] = useMutation<{ createCineast: SuccessOutput }, { input: CreateCineastInput }>(
    gql`
      mutation ($input: CreateSeasonInput!) {
        createCineast(CreateSeasonInput: $input) {
          isSuccess
        }
      }
    `
  );

  const mutateAsync = async (input: CreateCineastInput) => {
    try {
      const result = await apiCaller({ variables: { input } });
      return result.data?.createCineast;
    } catch (error) {
      handleError(error);
    }
  };

  return { mutateAsync, data: status.data?.createCineast, isPending: status.loading, ...status };
}

export function useGetSeriesDetailsById(params: SeriesIdParams) {
  const { handleError } = useErrorHandler();

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
          imageUrl
          uploadDate
          isFree
        }
      }
    `,
    {
      variables: { params },
    }
  );

  if (status.error) {
    handleError(status.error);
  }

  return { ...status, isLoading: status.loading, data: status.data?.getSeriesDetailsById };
}

export function useUpdateSeries() {
  const seriesError = useErrorHandler();

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