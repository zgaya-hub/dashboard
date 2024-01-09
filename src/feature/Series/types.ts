import { MediaCountriesEnum, LanguagiesEnum, MediaGenriesEnum, MediaStatusEnum } from "@/types/enum";

export interface SeriesCreateFormFieldInterface {
  title: string;
  plotSummary: string;
  releaseDate: number;
  imageId: string;
  originCountry: MediaCountriesEnum;
  originalLanguage: LanguagiesEnum;
  genre: MediaGenriesEnum;
  status: MediaStatusEnum;
}

export interface TableSeriesInterface {
  ID: string;
  originCountry: MediaCountriesEnum;
  originalLanguage: LanguagiesEnum;
  genre: MediaGenriesEnum;
  status: MediaStatusEnum;
  title: string;
  plotSummary: string;
  releaseDate: number;
  imageUrl: string;
  createdAt: number;
  updatedAt: number;
}
