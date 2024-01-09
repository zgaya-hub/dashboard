type SeriesEntityType = {
  isFree: number;
  priceInDollar: number;
} & EntityBaseType;

type ImageEntityType = {
  variant: string;
  url: string;
} & EntityBaseType;

type MediaBasicInfoEntityType = {
  plotSummary: string;
  releaseDate: number;
  title: string;
} & EntityBaseType;

type AdditionalInfoEntityType = {
  originCountry: MediaCountriesEnum;
  originalLanguage: MediaLanguagiesEnum;
  genre: MediaGenriesEnum;
  status: MediaStatusEnum;
} & EntityBaseType;

type SeasonEntityType = {
  number: number;
} & EntityBaseType;

type CineastEntityType = {
  fullName: string;
  profession: CineastProfessionEnum;
  dateOfBirth: number;
  bio: string;
  gender: GenderEnum;
  country: MediaCountriesEnum;
  award: Array<string>;
} & EntityBaseType;
