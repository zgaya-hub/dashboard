import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainStack from "./navigation/Main.routes";
import { I18nextProvider } from "react-i18next";
import { i18n } from "./i18n";
import { ThemeProvider } from "./theme/Theme.context";
import "./i18n";
import { UserDetailProvider } from "./context/UserDetail.context";
import { AuthContextProvider } from "./context/AuthContext";
import { GqlErrorProvider } from "./context/GqlErrorContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 10000,
    },
    mutations: {},
  },
});

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <I18nextProvider i18n={i18n}>
          <AuthContextProvider>
            <ThemeProvider>
              <UserDetailProvider>
                <GqlErrorProvider>
                  <MainStack />
                </GqlErrorProvider>
              </UserDetailProvider>
            </ThemeProvider>
          </AuthContextProvider>
        </I18nextProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

export default App;
