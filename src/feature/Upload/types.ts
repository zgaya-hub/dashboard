import { MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "mirra-scope-client-types/lib";

export interface CreateEpisodeFormFieldType {
  title: string;
  plotSummary: string;
  releaseDate: number;
  number: number;
}

export interface CreateMovieFormFieldType {
  title: string;
  plotSummary: string;
  releaseDate: number;
  imageId: string;
  originCountry: MediaCountriesEnum;
  originalLanguage: MediaLanguagiesEnum;
  genre: MediaGenriesEnum;
  status: MediaStatusEnum;
}
