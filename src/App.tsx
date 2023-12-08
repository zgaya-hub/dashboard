import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainStack from "./navigation/Main.routes";
import { I18nextProvider } from "react-i18next";
import { i18n } from "./i18n";
import { ThemeProvider } from "./theme/Theme.context";
import { SidebarProvider } from "./context/Sidebar.context";
import "./i18n";
import { UserDetailProvider } from "./context/UserDetail.context";
import { AuthContextProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <AuthContextProvider>
          <ThemeProvider>
            <SidebarProvider>
              <UserDetailProvider>
                <MainStack />
              </UserDetailProvider>
            </SidebarProvider>
          </ThemeProvider>
        </AuthContextProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export default App;
