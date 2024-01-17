import { ZgayaHubMediaEnum } from "zgaya.hub-client-types/lib";

export type GetSharelinkInput = {
  MediaId: string;
  MediaType: ZgayaHubMediaEnum;
};

export type GetImageByMediaIdParams = {
  MediaId: string;
};
