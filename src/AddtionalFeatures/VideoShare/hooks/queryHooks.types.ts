import { MovierMediaEnum } from "@/types/enum";

export type GetSharelinkInput = {
  MediaId: string;
  MediaType: MovierMediaEnum;
};

export type GetImageByMediaIdParams = {
  MediaId: string;
};
