import { CreateImageInput, ImageIdOutput, CreateSeriesInput, DeleteMultipleSeriesByIdzOutput, DeleteMultipleSeriesByIdzParams, DeleteSeriesByIdOutput, DeleteSeriesByIdParams, GetManagerSeriesForTableInput, GetManagerSeriesForTableOutput, UpdateSeriesInput, UpdateSeriesOutput, UpdateSeriesParams, GetMediaBasicInfoByMediaIdParams, GetMediaAdditionalInfoByMediaIdParams, GetImageByMediaIdParams, GetCineastsBySeriesIdParams } from "./queryHooks.types";
import { gql, useMutation, useQuery } from "@apollo/client";

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
      console.error(error);
    }
  };

  status;

  return { mutateAsync, data: status.data?.createImage, isPending: status.loading, ...status };
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

export function useGetImageByMediaId(param: GetImageByMediaIdParams) {
  const status = useQuery<{ getImageByMediaId: ImageEntityType }>(
    gql`
      query ($param: GetImageByMediaIdParams!) {
        getImageByMediaId(GetImageByMediaIdParams: $param) {
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
  return { ...status, isLoading: status.loading, data: status.data?.getImageByMediaId };
}

export function useGetCineastsBySeriesId(param: GetCineastsBySeriesIdParams) {
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
  return { ...status, isLoading: status.loading, data: status.data?.getCineastsBySeriesId };
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
            imageUrl
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
