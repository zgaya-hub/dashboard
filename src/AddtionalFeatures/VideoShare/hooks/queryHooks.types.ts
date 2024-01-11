import { MirraScopeMediaEnum } from "mirra-scope-client-types/lib";

export type GetSharelinkInput = {
  MediaId: string;
  MediaType: MirraScopeMediaEnum;
};

export type GetImageByMediaIdParams = {
  MediaId: string;
};
