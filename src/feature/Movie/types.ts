import { MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "zgaya.hub-client-types/lib";

export interface TableMovieInterface {
  ID: string;
  originCountry: MediaCountriesEnum;
  originalLanguage: MediaLanguagiesEnum;
  genre: MediaGenriesEnum;
  status: MediaStatusEnum;
  title: string;
  plotSummary: string;
  releaseDate: number;
  imageUrl: string;
  createdAt: number;
  updatedAt: number;
}
