import Snackbar from "@/components/Snackbar";
import { useAuthContext } from "@/context/AuthContext";
import useNavigation from "@/navigation/use-navigation";
import React, { useEffect, useState } from "react";

export default function FourOFourScreen() {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuthContext();
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("/home");
    } else {
      navigation.navigate("/sign-in");
    }
  }, [isAuthenticated]);

  const handleOnToggleSnackbar = () => {
    setIsSnackbarVisible(!isSnackbarVisible);
  };

  return (
    <>
      <Snackbar open={isSnackbarVisible} onClose={handleOnToggleSnackbar} message={"Screen not found"} />
    </>
  );
}
