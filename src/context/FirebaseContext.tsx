import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface FirebaseContextProps {
  app: FirebaseApp;
  auth: Auth | undefined;
}

interface FirebaseProviderProps {
  children: ReactNode;
}

const firebaseConfig = {
  apiKey: "AIzaSyDBe4Ae_910_0DQwUN4rLP0aeyfT3nlB30",
  authDomain: "zgayahub-b1734.firebaseapp.com",
  projectId: "zgayahub-b1734",
  storageBucket: "zgayahub-b1734.appspot.com",
  messagingSenderId: "29411977017",
  appId: "1:29411977017:web:414a6868fd0a51b426aae8",
  measurementId: "G-4C2NTMFTV4",
};

const defaultValue = {
  app: initializeApp(firebaseConfig),
  auth: undefined,
};

const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined);

export function FirebaseProvider({ children }: Readonly<FirebaseProviderProps>) {
  const [state, setState] = useState<FirebaseContextProps>(defaultValue);

  useEffect(() => {
    setState((v) => ({ ...v, auth: getAuth(state.app) }));
  }, []);

  return <FirebaseContext.Provider value={{ ...state }}>{children}</FirebaseContext.Provider>;
}

export default function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
}
