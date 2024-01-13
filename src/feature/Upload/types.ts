import { MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "zgaya.hub-client-types/lib";

export interface CreateEpisodeFormFieldType {
  title: string;
  plotSummary: string;
  releaseDate: number;
  number: number;
  imageId: string;
  thumbnailUrl: string;
}

export interface CreateMovieFormFieldType {
  title: string;
  plotSummary: string;
  releaseDate: number;
  imageId: string;
  thumbnailUrl: string;
  originCountry: MediaCountriesEnum;
  originalLanguage: MediaLanguagiesEnum;
  genre: MediaGenriesEnum;
  status: MediaStatusEnum;
}
