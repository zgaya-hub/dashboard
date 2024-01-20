import Button from "@/components/Button";
import { Dialog, DialogActions, DialogTitle } from "@/components/Dialog";
import { ClearIcon, FeedbackIcon } from "@/components/icons";
import { DialogContent, Stack, SxProps, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useChangeMovie, useGetUploadVideoSignedUrl, useUploadVideoOnAwsS3 } from "../hooks";
import { convertVideoInBlob, extractVideoMetadata, extractVideoUrl } from "metalyzer";
import { useEffect, useRef } from "react";
import { ZgayaHubMediaEnum } from "zgaya.hub-client-types/lib";
import { MovieUploadIcon } from ".";

interface MovieUploadModalProps {
  isVisible: boolean;
  movieId: string;
  onClose: () => void;
}

export default function MovieUploadModal({ isVisible, onClose, movieId }: MovieUploadModalProps) {
  const movieRef = useRef<string>("");

  const { mutateAsync: getUploadMovieUrlMutateAsync, isPending: isGetUploadMovieUrlLoading, data: getSignedUrlData } = useGetUploadVideoSignedUrl();
  const { mutateAsync: uploadVideoOnAwsS3MutateAsync, progress } = useUploadVideoOnAwsS3();
  const { mutateAsync: changeMovieMutateAsync } = useChangeMovie();

  useEffect(() => {
    const handleOnFinish = async () => {
      // TODO: this should handle if error occured in this API after upload movie when user can't do anything
      await changeMovieMutateAsync({ MovieId: movieId }, { SignedUrlKeyId: getSignedUrlData?.signedUrlKeyId!, VideoId: getSignedUrlData?.videoId! });
      onClose();
    };

    if (progress === 100) {
      handleOnFinish();
    }
  }, [progress]);

  const handleOnMovieSelect = async (movie: File) => {
    const movieMetadata = await extractVideoMetadata(movie);
    movieRef.current = await extractVideoUrl(movie);
    const result = await getUploadMovieUrlMutateAsync({
      Height: movieMetadata.videoHeight!,
      Width: movieMetadata.videoWidth!,
      MediaType: ZgayaHubMediaEnum.EPISODE,
      Mime: movieMetadata.mimeType,
      RunTime: movieMetadata.videoDuration,
      SizeInKb: movieMetadata.fileSizeKB,
    });
    handleOnUploadOnAwsS3(movie, result?.signedUrl!);
  };

  const handleOnUploadOnAwsS3 = async (movie: File, signedUrl: string) => {
    const videoBlob = await convertVideoInBlob(movie);
    await uploadVideoOnAwsS3MutateAsync({ SignedUrl: signedUrl, VideoBlob: videoBlob });
  };

  const { isDragActive, getRootProps } = useDropzone({
    onDrop: ([movie]) => handleOnMovieSelect(movie),
  });

  const dialogContentStyle: SxProps = {
    pointerEvents: isGetUploadMovieUrlLoading || progress ? "none" : "auto",
  };

  return (
    <Dialog fullWidth maxWidth="xs" onClose={onClose} open={isVisible}>
      <DialogTitle variant="h5" flexDirection={"row"} justifyContent={"space-between"} display={"flex"} alignItems={"center"}>
        Upload movie
        <ClearIcon onClick={onClose} iconButton={false} />
      </DialogTitle>
      <DialogContent dividers {...getRootProps()} sx={dialogContentStyle}>
        <Stack alignItems={"center"} py={4}>
          <MovieUploadIcon progress={progress} isLoading={isGetUploadMovieUrlLoading} isDragActive={isDragActive} />
          {/* TODO: use i18n here */}
          <Typography variant="subtitle2">You can drag and drop video file here</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="text">
          <FeedbackIcon />
        </Button>
      </DialogActions>
    </Dialog>
  );
}
