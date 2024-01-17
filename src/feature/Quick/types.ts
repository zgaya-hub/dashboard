import { GenderEnum, MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "zgaya.hub-client-types/lib";

import { CineastProfessionEnum } from "@/types/enum";

export interface SeriesCreateFormFieldInterface {
  title: string;
  plotSummary: string;
  releaseDate: number;
  imageId: string;
}

export interface SeriesUpdateFormFieldInterface {
  title: string;
  plotSummary: string;
  releaseDate: number;
  imageId: string;
  originCountry: MediaCountriesEnum;
  originalLanguage: MediaLanguagiesEnum;
  genre: MediaGenriesEnum;
  status: MediaStatusEnum;
  netProfit: number
  revenue: number
  budget: number
}

export interface CineastCreateFormFieldInterface {
  imageId: string;
  fullName: string;
  profession: CineastProfessionEnum;
  dateOfBirth: number;
  bio: string;
  gender: GenderEnum;
  country: MediaCountriesEnum;
  award: string[];
}

export interface SeasonCreateFormFieldInterface {
  title: string;
  plotSummary: string;
  releaseDate: number;
  number: number;
  imageId: string;
}
