import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { GoogleAuthProvider } from "firebase/auth";

export const Authcontext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currenstuser) => {
      setuser(currenstuser);
      setloading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const createUser = (email, password) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signin = (email, password) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const singout = () => {
    setloading(true);
    return signOut(auth);
  };

  const gogleloggedin = () => {
    return signInWithPopup(auth, provider);
  };

  const authinfo = {
    createUser,
    signin,
    loading,
    user,
    singout,
    gogleloggedin,
  };

  return (
    <Authcontext.Provider value={authinfo}>{children}</Authcontext.Provider>
  );
};

export default AuthProvider;
