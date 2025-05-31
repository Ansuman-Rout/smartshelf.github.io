import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children} {/* Only render after Firebase checks auth */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
