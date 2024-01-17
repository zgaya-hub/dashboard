import { useTranslation } from "react-i18next";

import { useGraphQlError } from "@/context/GraphQlErrorContext";

interface ImageServerErrorResponse {
  message: string;
}

export function useSeriesError() {
  const { t } = useTranslation();
  const { showSnackbar: showImageSnackbar } = useGraphQlError();

  const getErrorMessage = (errorResponse: ImageServerErrorResponse): { message: string } => {
    switch (errorResponse.message) {
      case "I-NF02":
        return {
          message: t("Image not found due to a server error."),
        };
      case "FI-NF01":
        return {
          message: t("Series have not financial-info to update."),
        };
      default:
        return {
          message: errorResponse.message,
        };
    }
  };

  const handleError = (errorResponse: ImageServerErrorResponse) => {
    showImageSnackbar(getErrorMessage(errorResponse).message);
  };

  return { getErrorMessage, handleError };
}
