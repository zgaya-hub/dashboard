import Snackbar from "@/components/Snackbar";
import { createContext, useContext, useState, ReactNode, useMemo } from "react";

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

  const errorMessage = useMemo(() => {
    if (Array.isArray(gqlError?.message)) {
      return gqlError?.message[0];
    } else {
      return gqlError?.message;
    }
  }, [gqlError]);

  const showGqlError = (error: ErrorResponse) => {
    const err = error.errors[0];
    setGqlError(err);

    // Check if the error indicates a credential mismatch
    if (err.message.includes("credential mismatch")) {
      // Handle credential mismatch error here, e.g., show a loop
      console.error("Credential mismatch error: ", err.message);
    }
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
        message={errorMessage}
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
  errors: [GqlError];
}
