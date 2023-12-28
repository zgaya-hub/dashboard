import { CountriesEnum, LanguagiesEnum, MediaGenriesEnum, MediaStatusEnum } from "@/types/enum";

export interface SeriesCreateFieldType {
  title: string;
  plotSummary: string;
  releaseDate: number;
  mediaImageId: string;
  originCountry: CountriesEnum;
  originalLanguage: LanguagiesEnum;
  mediaGenre: MediaGenriesEnum;
  mediaStatus: MediaStatusEnum;
}
