import { CountriesEnum, LanguagiesEnum, MediaGenriesEnum, MediaStatusEnum } from "@/types/enum";

export interface CreateSeriesFieldType {
  title: string;
  plotSummary: string;
  releaseDate: number;
  originCountry: CountriesEnum;
  originalLanguage: LanguagiesEnum;
  genre: MediaGenriesEnum;
  status: MediaStatusEnum;
}
