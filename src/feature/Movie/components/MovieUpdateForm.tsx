import { useGetMovieDetailsById } from "../hooks";

interface MovieUpdateFormProps {
  movieId: string;
}

export default function MovieUpdateForm({ movieId }: MovieUpdateFormProps) {
  const { data: seriesDetailsData, isLoading: isSeriesDetailsLoading } = useGetMovieDetailsById({ MovieId: movieId });

  return <div>MovieUpdateForm</div>;
}
