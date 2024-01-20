import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isLogin } from "../../Hooks/useAuth";

// import { withRouter } from "react-router-dom";
import Header from "./../../components/Header.jsx";
import HeaderLogout from "./../../components/HeaderLogout.jsx";

import { useLocation } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  // return (

  //   <Route {...rest}> {isLogin ? children : <Navigate to="/login" /> } </Route>
  // );
  // const auth = useAuth();
  const location = useLocation();
  console.log(location.pathname, "params");

  return isLogin() ? (
    <div>
      {location.pathname === "/chatApp" && isLogin() ? "" : <HeaderLogout />}
      {children}
    </div>
  ) : (
    <div>
      <Header />
      <Navigate to="/" />
    </div>
  );
};

export default PrivateRoute;
