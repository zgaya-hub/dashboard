import { gql, useMutation, useQuery } from "@apollo/client";
import { CreateImageInput, CreateSeasonInput, CreateSeriesInput, GetNextSeasonNumberOutput, GetNextSeasonNumberParams, ImageIdOutput } from "mirra-scope-client-types/lib";
import { CreateCineastInput } from "./queryHooks.types";

export function useCreateImage() {
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
      throw new Error(error);
    }
  };

  return { mutateAsync, data: status.data?.createImage, isPending: status.loading, ...status };
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
      throw new Error(error);
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
      throw new Error(error);
    }
  };

  return { mutateAsync, data: status.data?.createSeason, isPending: status.loading, ...status };
}
export function useCreateCineast() {
  const [apiCaller, status] = useMutation<{ createCineast: CommonSuccessOutput }, { input: CreateCineastInput }>(
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
      throw new Error(error);
    }
  };

  return { mutateAsync, data: status.data?.createCineast, isPending: status.loading, ...status };
}
