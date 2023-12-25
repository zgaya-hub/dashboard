import { useState, useEffect } from "react";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@/components/ProgressBars";
import { useAuthContext } from "@/context/AuthContext";
import useNavigation from "@/navigation/use-navigation";

export default function FourOFourScreen() {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuthContext();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 5;
        if (newProgress === 100) {
          clearInterval(interval);
          if (isAuthenticated) {
            navigation.navigate("/home");
          } else {
            navigation.navigate("/sign-in");
          }
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isAuthenticated, navigation]);

  return (
    <Backdrop open>
      <CircularProgress value={progress} color="inherit" />
    </Backdrop>
  );
}
