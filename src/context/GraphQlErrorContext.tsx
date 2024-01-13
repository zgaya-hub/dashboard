import { createContext, useContext, useState, ReactNode } from "react";
import Snackbar from "@/components/Snackbar";

interface GraphQlErrorContextProps {
  showGraphQlError: (error: ServerErrorResponse) => void;
  showSnackbar: (error: string) => void;
}

const GraphQlErrorContext = createContext<GraphQlErrorContextProps | undefined>(undefined);

export function GraphQlErrorProvider({ children }: { children: ReactNode }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showGraphQlError = (error: ServerErrorResponse) => {
    setErrorMessage(error.message);
  };

  const showSnackbar = (error: string) => {
    setErrorMessage(error);
  };

  const handleClose = () => {
    setErrorMessage(null);
  };

  return (
    <GraphQlErrorContext.Provider value={{ showGraphQlError, showSnackbar }}>
      {children}
      {!!errorMessage && <Snackbar open={true} onClose={handleClose} message={errorMessage} AlertProps={{ onClose: handleClose }} />}
    </GraphQlErrorContext.Provider>
  );
}

export function useGraphQlError(): GraphQlErrorContextProps {
  const context = useContext(GraphQlErrorContext);
  if (!context) throw new Error("useGraphQlError must be used within a GraphQlErrorProvider");
  return context;
}
