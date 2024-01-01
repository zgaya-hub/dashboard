type MovierMediaType = "movie" | "episode" | "trailer";

type EntityBaseType = {
  createdAt: number;
  updatedAt: number;
  deleteAt: number;
  ID: string;
};

type CommonSuccessOutput = {
  isSuccess: boolean;
};

type GqlError = {
  message: string;
};
type ServerErrorResponse = {
  response: { errors: [GqlError] };
};
