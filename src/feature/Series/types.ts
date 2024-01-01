import { CountriesEnum, LanguagiesEnum, MediaGenriesEnum, MediaStatusEnum } from "@/types/enum";

export interface SeriesCreateFormFieldInterface {
  title: string;
  plotSummary: string;
  releaseDate: number;
  mediaImageId: string;
  originCountry: CountriesEnum;
  originalLanguage: LanguagiesEnum;
  genre: MediaGenriesEnum;
  status: MediaStatusEnum;
}

export interface TableSeriesInterface {
  ID: string;
  originCountry: CountriesEnum;
  originalLanguage: LanguagiesEnum;
  genre: MediaGenriesEnum;
  status: MediaStatusEnum;
  title: string;
  plotSummary: string;
  releaseDate: number;
  mediaImageUrl: string;
  createdAt: number;
  updatedAt: number;
}
