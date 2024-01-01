type SeriesEntityType = {
  isFree: number;
  priceInDollar: number;
} & EntityBaseType;

type MediaImageEntityType = {
  variant: string;
  url: string;
} & EntityBaseType;

type MediaBasicInfoEntityType = {
  plotSummary: string;
  releaseDate: number;
  title: string;
} & EntityBaseType;

type MediaAdditionalInfoEntityType = {
  originCountry: MediaCountriesEnum;
  originalLanguage: MediaLanguagiesEnum;
  genre: MediaGenriesEnum;
  status: MediaStatusEnum;
} & EntityBaseType;

type SeasonEntityType = {
  number: number;
} & EntityBaseType;
