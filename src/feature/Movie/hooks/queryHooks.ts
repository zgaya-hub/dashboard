import { DeleteMovieByIdParams, DeleteMultipleMovieByIdzParams, GetManagerMovieForTableInput, GetManagerMovieForTableOutput, MovieIdParams, SuccessOutput, UpdateMovieInput } from "zgaya.hub-client-types/lib";
import { useErrorHandler } from ".";
import { gql, useMutation, useQuery } from "@apollo/client";

export function useDeleteMultipleMovieByIdz() {
  const seriesError = useErrorHandler();
  const [apiCaller, status] = useMutation<{ deleteMultipleMovieByIdz: SuccessOutput }, { params: DeleteMultipleMovieByIdzParams }>(
    gql`
      mutation ($params: DeleteMultipleMovieByIdzParams!) {
        deleteMultipleMovieByIdz(DeleteMultipleMovieByIdzParams: $params) {
          isSuccess
        }
      }
    `
  );

  const mutateAsync = async (params: DeleteMultipleMovieByIdzParams) => {
    try {
      const result = await apiCaller({ variables: { params } });
      return result.data?.deleteMultipleMovieByIdz;
    } catch (error) {
      seriesError.handleError(error);
      throw new Error(error);
    }
  };

  return { mutateAsync, data: status.data?.deleteMultipleMovieByIdz, isPending: status.loading, ...status };
}

export function useUpdateMovie() {
  const seriesError = useErrorHandler();

  const [apiCaller, status] = useMutation<{ updateMovie: SuccessOutput }, { params: MovieIdParams; input: UpdateMovieInput }>(
    gql`
      mutation ($params: MovieIdParams!, $input: UpdateMovieInput!) {
        updateMovie(MovieIdParams: $params, UpdateMovieInput: $input) {
          isSuccess
        }
      }
    `
  );

  const mutateAsync = async (params: MovieIdParams, input: UpdateMovieInput) => {
    try {
      const result = await apiCaller({ variables: { input, params } });
      return result.data?.updateMovie;
    } catch (error) {
      seriesError.handleError(error);
      throw new Error(error);
    }
  };

  return { mutateAsync, data: status.data?.updateMovie, isPending: status.loading, ...status };
}

export function useGetManagerMovieForTable(input: GetManagerMovieForTableInput) {
  const seriesError = useErrorHandler();
  const status = useQuery<{ getManagerMovieForTable: GetManagerMovieForTableOutput }, { input: GetManagerMovieForTableInput }>(
    gql`
      query ($input: GetManagerMovieForTableInput!) {
        getManagerMovieForTable(GetManagerMovieForTableInput: $input) {
          totalRecords
          movieList {
            ID
            status
            title
            plotSummary
            releaseDate
            imageUrl
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

  return { ...status, isLoading: status.loading, data: status.data?.getManagerMovieForTable };
}

export function useDeleteMovieById() {
  const seriesError = useErrorHandler();
  const [apiCaller, status] = useMutation<{ deleteMovieById: SuccessOutput }, { params: DeleteMovieByIdParams }>(gql`
    mutation ($params: DeleteMovieByIdParams!) {
      deleteMovieById(DeleteMovieByIdParams: $params) {
        isSuccess
      }
    }
  `);

  const mutateAsync = async (params: DeleteMovieByIdParams) => {
    try {
      const result = await apiCaller({ variables: { params } });
      return result.data?.deleteMovieById;
    } catch (error) {
      seriesError.handleError(error);
      throw new Error(error);
    }
  };

  status;

  return { mutateAsync, data: status.data?.deleteMovieById, isPending: status.loading, ...status };
}

export function useGetMovieDetailsById(params: MovieIdParams) {
  const { handleError } = useErrorHandler();

  const status = useQuery<{ getMovieDetailsById: GetMovieDetailsByIdOutput }>(
    gql`
      query ($params: MovieIdParams!) {
        getMovieDetailsById(MovieIdParams: $params) {
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

  return { ...status, isLoading: status.loading, data: status.data?.getMovieDetailsById };
}
