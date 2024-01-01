import { CreateMediaImageInput, MediaImageIdOutput, CreateSeasonInput, CreateSeriesInput, GetNextSeasonNumberOutput, GetNextSeasonNumberParams } from "./queryHooks.types";
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

  return { mutateAsync, data: status.data?.createMediaImage, isPending: status.loading, ...status };
}

export function useCreateSeries() {
  const [apiCaller, status] = useMutation<{ createSeries: CommonSuccessOutput }, { input: CreateSeriesInput }>(
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
      console.error(error);
    }
  };

  return { mutateAsync, data: status.data?.createSeries, isPending: status.loading, ...status };
}

export function useGetNextSeasonNumber(param: GetNextSeasonNumberParams) {
  const status = useQuery<{ getNextSeasonNumber: GetNextSeasonNumberOutput }>(
    gql`
      query ($param: GetNextSeasonNumberParams!) {
        getNextSeasonNumber(GetNextSeasonNumberParams: $param) {
          number
        }
      }
    `,
    {
      variables: { param },
    }
  );
  return { ...status, isLoading: status.loading, data: status.data?.getNextSeasonNumber };
}

export function useCreateSeason() {
  const [apiCaller, status] = useMutation<{ createSeason: CommonSuccessOutput }, { input: CreateSeasonInput }>(
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
      console.error(error);
    }
  };

  return { mutateAsync, data: status.data?.createSeason, isPending: status.loading, ...status };
}
