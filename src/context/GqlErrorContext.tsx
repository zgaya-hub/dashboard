import Snackbar from "@/components/Snackbar";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface GqlError {
  errorId?: string;
  message: string;
  date?: Date;
}

interface GqlErrorContextProps {
  showGqlError: (error: GqlError) => void;
}

const GqlErrorContext = createContext<GqlErrorContextProps | undefined>(undefined);

interface GqlErrorProviderProps {
  children: ReactNode;
}

export function GqlErrorProvider({ children }: GqlErrorProviderProps) {
  const [gqlError, setGqlError] = useState<GqlError | null>(null);

  const showGqlError = (error: GqlError) => {
    setGqlError(error);
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
        message={gqlError?.message}
        muiProps={{
          AlertProps: { onClose: handleClose },
        }}
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
