export const handleOnGetImageBackgroundColor = async (
  imageUrl: string
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        reject("Unable to get 2D context");
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      const imageData = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;

      // Calculate the average color of the image
      let totalRed = 0;
      let totalGreen = 0;
      let totalBlue = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        totalRed += imageData[i];
        totalGreen += imageData[i + 1];
        totalBlue += imageData[i + 2];
      }

      const averageRed = Math.round(totalRed / (imageData.length / 4));
      const averageGreen = Math.round(totalGreen / (imageData.length / 4));
      const averageBlue = Math.round(totalBlue / (imageData.length / 4));

      const backgroundColor = `rgb(${averageRed}, ${averageGreen}, ${averageBlue})`;

      resolve(backgroundColor);
    };

    img.onerror = function () {
      reject("Error loading image");
    };
  });
};
