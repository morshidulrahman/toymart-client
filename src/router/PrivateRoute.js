import React, { useContext } from "react";
import { Authcontext } from "../components/Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/shared/Loader";

const Privateroute = ({ children }) => {
  const { user, loading } = useContext(Authcontext);
  let location = useLocation();
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (user?.email) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default Privateroute;
