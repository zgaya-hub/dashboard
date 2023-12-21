export function getVideoThumbnail(file: File, options?: VideoThumbnailOptions): Promise<string | null> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");

    const videoLoaded = () => {
      const { width = video.videoWidth, height = video.videoHeight } = options || {};

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, width, height);
        const thumbnail = canvas.toDataURL("image/png");
        resolve(thumbnail);
      } else {
        resolve(null);
      }

      // Clean up
      URL.revokeObjectURL(video.src);
    };

    video.addEventListener("loadeddata", videoLoaded);

    // Handle errors
    video.addEventListener("error", () => {
      resolve(null);
    });

    // Set the video source
    const videoURL = URL.createObjectURL(file);
    video.src = videoURL;

    // Load the video metadata
    video.load();
  });
}

interface VideoThumbnailOptions {
  width?: number;
  height?: number;
}
