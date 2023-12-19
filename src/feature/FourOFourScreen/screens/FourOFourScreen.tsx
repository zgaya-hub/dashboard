import { useAuthContext } from "@/context/AuthContext";
import useNavigation from "@/navigation/use-navigation";
import { useEffect } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export default function FourOFourScreen() {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.navigate("/home");
      } else {
        navigation.navigate("/sign-in");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigation]);

  return (
    <Backdrop open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
