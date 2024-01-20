import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./components/signup/Signup.jsx";
import Login from "./components/Login/Login";
import Forgotpass from "./components/Forgotpass/ForgotPass";
import Resetpass from "./components/Forgotpass/ResetPass";
import VerifyRegTokenMail from "./components/VerifyEmaill/VerifyRegTokenMail";
import VerifyTockenMail from "./components/Forgotpass/VerifyTockenMail.jsx";

import Home from "./components/Home";
import ChatApp from "./components/ChatApp";

import PrivateRoute from "./components/PrivateRoutes/PrivateRoute.js";
import PublicRoute from "./components/PublicRoutes/PublicRoute.js";

function App() {
  return (
    <Routes>
      <Route
        index
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/chatApp"
        element={
          <PrivateRoute>
            <ChatApp />
          </PrivateRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/forgotpass"
        element={
          <PublicRoute>
            <Forgotpass />
          </PublicRoute>
        }
      />
      <Route
        path="/resetpass"
        element={
          <PublicRoute>
            <Resetpass />
          </PublicRoute>
        }
      />
      <Route
        path="/verify-email"
        element={
          <PublicRoute>
            <VerifyRegTokenMail />
          </PublicRoute>
        }
      />

      <Route
        path="/verifyTockenMail"
        element={
          <PublicRoute>
            <VerifyTockenMail />
          </PublicRoute>
        }
      />
      {/* <Route
        path="/getblog/:id"
        element={
          <PublicRoute>
            <Getblog />
          </PublicRoute>
        }
      /> */}
    </Routes>
  );
}

export default App;
