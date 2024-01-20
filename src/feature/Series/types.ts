import { MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "zgaya.hub-client-types/lib";

export interface SeriesCreateFormFieldInterface {
  title: string;
  plotSummary: string;
  releaseDate: number;
  imageId: string;
  originCountry: MediaCountriesEnum;
  originalLanguage: MediaLanguagiesEnum;
  genre: MediaGenriesEnum;
  status: MediaStatusEnum;
}
