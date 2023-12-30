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

type SeasonEntityType = {
  number: number;
} & EntityBaseType;
