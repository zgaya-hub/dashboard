import { DeleteMovieByIdParams, DeleteMultipleMovieByIdzParams, GetManagerMovieForTableInput, GetManagerMovieForTableOutput, MovieIdParams, SuccessOutput, UpdateMovieInput } from "zgaya.hub-client-types/lib";
import { useErrorHandler } from ".";
import { gql, useMutation, useQuery } from "@apollo/client";

export function useDeleteMultipleMovieByIdz() {
  const seriesError = useErrorHandler();
  const [apiCaller, status] = useMutation<{ deleteMultipleMovieByIdz: SuccessOutput }, { param: DeleteMultipleMovieByIdzParams }>(
    gql`
      mutation ($param: DeleteMultipleMovieByIdzParams!) {
        deleteMultipleMovieByIdz(DeleteMultipleMovieByIdzParams: $param) {
          isSuccess
        }
      }
    `
  );

  const mutateAsync = async (param: DeleteMultipleMovieByIdzParams) => {
    try {
      const result = await apiCaller({ variables: { param } });
      return result.data?.deleteMultipleMovieByIdz;
    } catch (error) {
      seriesError.handleError(error);
    }
  };

  return { mutateAsync, data: status.data?.deleteMultipleMovieByIdz, isPending: status.loading, ...status };
}

export function useUpdateMovie() {
  const seriesError = useErrorHandler();

  const [apiCaller, status] = useMutation<{ updateMovie: SuccessOutput }, { param: MovieIdParams; input: UpdateMovieInput }>(
    gql`
      mutation ($param: MovieIdParams!, $input: UpdateMovieInput!) {
        updateMovie(MovieIdParams: $param, UpdateMovieInput: $input) {
          isSuccess
        }
      }
    `
  );

  const mutateAsync = async (param: MovieIdParams, input: UpdateMovieInput) => {
    try {
      const result = await apiCaller({ variables: { input, param } });
      return result.data?.updateMovie;
    } catch (error) {
      seriesError.handleError(error);
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
  const [apiCaller, status] = useMutation<{ deleteMovieById: SuccessOutput }, { param: DeleteMovieByIdParams }>(gql`
    mutation ($param: DeleteMovieByIdParams!) {
      deleteMovieById(DeleteMovieByIdParams: $param) {
        isSuccess
      }
    }
  `);

  const mutateAsync = async (param: DeleteMovieByIdParams) => {
    try {
      const result = await apiCaller({ variables: { param } });
      return result.data?.deleteMovieById;
    } catch (error) {
      seriesError.handleError(error);
    }
  };

  status;

  return { mutateAsync, data: status.data?.deleteMovieById, isPending: status.loading, ...status };
}
