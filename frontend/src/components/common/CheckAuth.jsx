import React from "react";
import { Navigate } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return (
      <>
        <Navigate to={"/"} />
        {children}
      </>
    );
  } else {
    return <>{children}</>;
  }
};

export default CheckAuth;
