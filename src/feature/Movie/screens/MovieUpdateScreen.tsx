import { useLocation } from "@/navigation";
import Page from "@/components/Page";
const { MovieUpdateForm } = lazily(() => import("../components"));
import { lazily } from "react-lazily";

export default function MovieUpdateScreen() {
  const { movieId } = useLocation("/movie/update");

  return (
    <Page isSuspense>
      <MovieUpdateForm movieId={movieId} />
    </Page>
  );
}
