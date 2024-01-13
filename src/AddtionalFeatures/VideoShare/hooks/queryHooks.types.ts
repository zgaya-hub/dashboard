import { MirraScopeMediaEnum } from "zgaya.hub-client-types/lib";

export type GetSharelinkInput = {
  MediaId: string;
  MediaType: MirraScopeMediaEnum;
};

export type GetImageByMediaIdParams = {
  MediaId: string;
};
