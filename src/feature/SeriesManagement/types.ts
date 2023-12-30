import { CountriesEnum, LanguagiesEnum, GenriesEnum, StatusEnum } from "@/types/enum";

export interface SeriesCreateFormFieldInterface {
  title: string;
  plotSummary: string;
  releaseDate: number;
  mediaImageId: string;
  originCountry: CountriesEnum;
  originalLanguage: LanguagiesEnum;
  genre: GenriesEnum;
  status: StatusEnum;
}

export interface TableSeriesInterface {
  ID: string;
  originCountry: CountriesEnum;
  originalLanguage: LanguagiesEnum;
  genre: GenriesEnum;
  status: StatusEnum;
  title: string;
  plotSummary: string;
  releaseDate: number;
  mediaImageUrl: string;
  createdAt: number;
  updatedAt: number;
}
