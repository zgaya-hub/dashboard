import { MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "zgaya.hub-client-types/lib";

export interface MovieUpdateFormFieldInterface {
  title: string;
  plotSummary: string;
  releaseDate: number;
  genre: MediaGenriesEnum;
  status: MediaStatusEnum;
  originCountry: MediaCountriesEnum;
  originalLanguage: MediaLanguagiesEnum;
  thumbnailUrl: string;
  image: File;
}
