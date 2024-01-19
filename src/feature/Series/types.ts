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
  netProfit: number;
  revenue: number;
  budget: number;
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
  imageUrl: string;
  createdAt: number;
  updatedAt: number;
}
export interface FinancialInfoCreateFormFieldInterface {
  revenue: number;
  netProfit: number;
  budget: number;
}
