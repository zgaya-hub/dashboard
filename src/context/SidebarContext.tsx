import { noop } from "lodash";
import Mousetrap from "mousetrap";
import React, { createContext, useContext, useMemo, useState } from "react";

interface SidebarContextProps {
  isFeedbackSidebarOpen: boolean;
  handleOnToggleFeedbackSidebar: () => void;
  isRootSidebarOpen: boolean;
  handleOnToggleRootSidebar: () => void;
}

const defaultContextValue: SidebarContextProps = {
  isFeedbackSidebarOpen: false,
  isRootSidebarOpen: false,
  handleOnToggleRootSidebar: noop,
  handleOnToggleFeedbackSidebar: noop,
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

  const handleOnToggleRootSidebar = () => {
    setState({ ...state, isRootSidebarOpen: !state.isRootSidebarOpen });
  };

  const contextValue = useMemo(
    () => ({
      ...state,
      handleOnToggleFeedbackSidebar,
      handleOnToggleRootSidebar,
    }),
    [state]
  );

  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>;
}

export function useSidebarContext() {
  return useContext(SidebarContext);
}
