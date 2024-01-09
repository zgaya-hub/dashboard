import React, { createContext, useContext, useMemo, useState } from "react";

interface SidebarContextProps {
  isFeedbackSidebarOpen: boolean;
  handleOnToggleFeedbackSidebar: () => void;
}

const defaultContextValue: SidebarContextProps = {
  isFeedbackSidebarOpen: false,
  handleOnToggleFeedbackSidebar: () => {},
};

const SidebarContext = createContext<SidebarContextProps>(defaultContextValue);

interface SidebarContextProviderProps {
  children: React.ReactNode;
}

export function SidebarContextProvider({ children }: SidebarContextProviderProps) {
  const [state, setState] = useState<SidebarContextProps>(defaultContextValue);

  const handleOnToggleFeedbackSidebar = () => {
    setState({ ...state, isFeedbackSidebarOpen: !state.isFeedbackSidebarOpen });
  };

  const contextValue = useMemo(
    () => ({
      ...state,
      handleOnToggleFeedbackSidebar: handleOnToggleFeedbackSidebar,
    }),
    [state]
  );

  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>;
}

export function useSidebarContext() {
  return useContext(SidebarContext);
}
