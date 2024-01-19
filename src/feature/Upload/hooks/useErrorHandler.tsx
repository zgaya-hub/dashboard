import { useGraphQlError } from "@/context/GraphQlErrorContext";
import { useTranslation } from "react-i18next";

interface ImageServerErrorResponse {
  message: string;
}

export function useErrorHandler() {
  const { t } = useTranslation();
  const { showSnackbar: showImageSnackbar } = useGraphQlError();

  const getErrorMessage = (errorResponse: ImageServerErrorResponse): { message: string } => {
    switch (errorResponse.message) {
      case "I-AIU01":
        return {
          message: t("Image is already in use. Please upload another image or click on 'reuse'."),
        };
      case "I-NF02":
        return {
          message: t("Image not found due to a server error."),
        };
      case "I-DNMT03":
        return {
          message: t("Please use any tool to crop or click on 'auto crop'."),
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
