type GetUploadVideoSignedUrlInput = {
  MediaType: VideorMediaEnum;
  Width: number;
  Height: number;
  RunTime: number;
  SizeInKb: number;
  Mime: VideoMineType;
};

type GetUploadVideoSignedUrlOutput = {
  SignedUrl: string
  SignedUrlKeyId: string
  VideoId: string
};
