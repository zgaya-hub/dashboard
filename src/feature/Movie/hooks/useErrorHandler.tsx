import { useTranslation } from "react-i18next";

import { useGraphQlError } from "@/context/GraphQlErrorContext";

interface ImageServerErrorResponse {
  message: string;
}

export function useErrorHandler() {
  const { t } = useTranslation();
  const { showSnackbar } = useGraphQlError();

  const getErrorMessage = (errorResponse: ImageServerErrorResponse): { message: string } => {
    switch (errorResponse.message) {
      case "I-NF02":
        return {
          message: t("Image not found due to a server error."),
        };
      default:
        return {
          message: errorResponse.message,
        };
    }
  };

  const handleError = (errorResponse: ImageServerErrorResponse) => {
    showSnackbar(getErrorMessage(errorResponse).message);
  };

  return { getErrorMessage, handleError };
}
