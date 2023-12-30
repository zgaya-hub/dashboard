import { MediaCountriesEnum, MediaLanguagiesEnum, MediaGenriesEnum, MediaStatusEnum } from "@/types/enum";

export interface SeriesCreateFieldInterface {
  title: string;
  plotSummary: string;
  releaseDate: number;
  mediaImageId: string;
  originCountry: MediaCountriesEnum;
  originalLanguage: MediaLanguagiesEnum;
  genre: MediaGenriesEnum;
  status: MediaStatusEnum;
}

export interface TableSeriesInterface {
  ID: string;
  originCountry: MediaCountriesEnum;
  originalLanguage: MediaLanguagiesEnum;
  genre: MediaGenriesEnum;
  status: MediaStatusEnum;
  title: string;
  plotSummary: string;
  releaseDate: number;
  mediaImageUrl: string;
  createdAt: number;
  updatedAt: number;
}
