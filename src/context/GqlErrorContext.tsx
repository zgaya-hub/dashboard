import Snackbar from "@/components/Snackbar";
import { createContext, useContext, useState, ReactNode } from "react";

interface GqlError {
  statusCode?: string;
  message: string[];
  error?: string;
}

interface GqlErrorContextProps {
  showGqlError: (error: ErrorResponse) => void;
}

const GqlErrorContext = createContext<GqlErrorContextProps | undefined>(undefined);

interface GqlErrorProviderProps {
  children: ReactNode;
}

export function GqlErrorProvider({ children }: GqlErrorProviderProps) {
  const [gqlError, setGqlError] = useState<GqlError | null>(null);

  const showGqlError = (error: ErrorResponse) => {
    const err = error.response.errors[0];

    setGqlError(err);
  };

  const handleClose = () => {
    setGqlError(null);
  };

  return (
    <GqlErrorContext.Provider value={{ showGqlError }}>
      {children}
      <Snackbar
        fullWidth
        open={!!gqlError}
        onClose={handleClose}
        message={gqlError?.message[0] ?? ""}
        muiProps={{
          AlertProps: { onClose: handleClose },
        }}
        severity={"error"}
      />
    </GqlErrorContext.Provider>
  );
}

export default function useGqlError(): GqlErrorContextProps {
  const context = useContext(GqlErrorContext);

  if (!context) {
    throw new Error("useGqlError must be used within a GqlErrorProvider");
  }

  return context;
}

export interface ErrorResponse {
  response: {
    errors: [GqlError];
  };
}
