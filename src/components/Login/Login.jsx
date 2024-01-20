import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import API from "./../../redux/url.js";

import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  InputLabel,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import back from "../../images/welcome-back.png";
import userName from "../../images/man-user.png";
import email from "../../images/email.png";
import padlock from "../../images/padlock.png";
import check from "../../images/check-mark.png";
import marketing from "../../images/marketing.png";
import robot from "../../images/robot.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ReCAPTCHA from "react-google-recaptcha";

import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { authuser } from "./../../redux/slices/globalSlice.js";
import { clearLoginMsg } from "./../../redux/slices/globalSlice.js";

import { isLogin } from "./../../Hooks/useAuth.js";
import { myRole } from "./../../Hooks/useAuth.js";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Signup = () => {
  const matches1 = useMediaQuery("(min-width:1050px)");
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [general, setgeneral] = useState(false);
  const matches2 = useMediaQuery("(min-Width:600px)");

  const LoginMsgUser = useSelector((store) => store.global.LoginMsg);
  const prevLoginMsgUserRef = useRef(null);
  React.useEffect(() => {
    if (LoginMsgUser !== prevLoginMsgUserRef.current) {
      // Dispatch the toast only if the message is different
      console.log("LoginMsgUser at login iseEffec", LoginMsgUser);

      if (LoginMsgUser == "Not available email") {
        //  dispatch(setSnackbar(true, "error", "Not available email"));
        // console.log("toast");
        toast.info("Not available email", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (LoginMsgUser == "Password Not Correct") {
        toast.error("Password Not Correct", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (LoginMsgUser == "Login Successfull") {
        toast.success("Login Successfull", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/chatApp", { replace: true });
      } else if (
        LoginMsgUser ==
        "NOT Verified, Check Mail, We Already Have Send you Email"
      ) {
        toast.info("NOT Verified, Check Mail, We Already Have Send you Email", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      // Update the ref with the current message
      prevLoginMsgUserRef.current = LoginMsgUser;
    }
  }, [LoginMsgUser]);

  let dispatch = useDispatch();
  const navigate = useNavigate();

  const errmsg = {
    color: "red",
    position: "relative",
    top: "-11px",
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [emailerr, setemailerr] = useState("");
  const [passerr, setpasserr] = useState("");

  const validate = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isemailVer = re.test(values.email);
    console.log("isemailVer", isemailVer);

    const pass = values.password;
    console.log("pass", pass);

    const conpass = values.cpassword;
    console.log("conpass", conpass);

    let isvalid = true;
    // const isvalid = {
    //   isvalidbool: true,

    // };

    if (!isemailVer) {
      isvalid = false;
      setemailerr("Your Email is not Correct!");
      setpasserr("");
    } else if (pass == "") {
      isvalid = false;
      setpasserr("Password ShouldNot Be Empty");
      setemailerr("");
    } else {
      setemailerr("");
      setpasserr("");
    }

    return isvalid;
  };

  //  useEffect(() => {
  //    // setauthloginMsg(loginMsg);
  //    console.log(loginMsg);
  //    if (loginMsg == "Password Not Correct") {
  //      setMsgone(true);
  //    }
  //  }, [loginMsg]);

  const Submithandler = (e) => {
    e.preventDefault();

    var isFormvalid = validate();
    console.log("isvalid", isFormvalid);

    if (isFormvalid) {
      dispatch(authuser(values));
      setTimeout(function () {
        dispatch(clearLoginMsg());
      }, 3000);
    }
  };
  ////////////////////
  // const LoginMsg = useSelector((store) => store.global);

  // console.log(LoginMsg.LoginMsg, "loginMsg");
  // if (LoginMsg.LoginMsg == "Password Not Correct") {
  //   // dispatch(setSnackbar(true, "error", "Password Not Correct"));
  //   toast.error("Password Not Correct!", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // } else if (
  //   LoginMsg.LoginMsg ==
  //   "NOT Verified, Check Mail, We Already Have Send you Email"
  // ) {
  //   // dispatch(setSnackbar(true, "info", "Password Not Correct"));
  //   toast.info("NOT Verified, Check Mail, We Already Have Send you Email", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // } else if (
  //   LoginMsg.LoginMsg == "Login Successfull" &&
  //   isLogin() === true &&
  //   myRole() === "Admin"
  // ) {
  //   // dispatch(setSnackbar(true, "success", "Login Successfull"));
  //   toast.success("Admin Panel is On Other Link", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  //   //  navigate(to="/blog");
  //   // navigate("/adminDashboard", { replace: true });
  // } else if (
  //   LoginMsg.LoginMsg == "Login Successfull" &&
  //   isLogin() === true &&
  //   myRole() === "User"
  // ) {
  //   // dispatch(setSnackbar(true, "success", "Login Successfull"));
  //   toast.success("User Login Successfull", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  //   //  navigate(to="/blog");
  //   navigate("/logo", { replace: true });
  // } else if (LoginMsg.LoginMsg == "Not available email") {
  //   // dispatch(setSnackbar(true, "error", "Not available email"));
  //   toast.warn("Not available email", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // }
  const [isRecapVerfid, setisRecapVerfid] = useState(true);

  function onChange(value) {
    console.log("Captcha value:", value);
    setisRecapVerfid(true);
  }

  // function onChange(e) {
  //   e.preventDefault();
  //   grecaptcha.ready(function () {
  //     grecaptcha
  //       .execute("6LeVHaAfAAAAAMtTBCfxxlHsJULQDAJP8OUJGQQl", { action: "submit" })
  //       .then(function (token) {
  //         setisRecapVerfid(true);
  //         // Add your logic to submit to your backend server here.
  //       });
  //   });
  // }

  return (
    <Box
      sx={{
        background: "white",
        mb: "30px",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            fontSize={{ xs: "28px", sm: "48px" }}
            sx={{
              fontWeight: "Bold",
              color: "#4594f1",
              borderBottom: "3px solid #4594f1",
              my: "5%",
              fontFamily: "MilkyNice",
            }}
          >
            Log In
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: "5%",
            }}
          >
            <img
              src={back}
              alt=""
              style={{ marginRight: "30px", maxWidth: "80px", width: "100%" }}
            />
            <Box>
              <Typography
                fontSize={{ xs: "18px", sm: "30px" }}
                sx={{
                  fontWeight: "Bold",
                  color: "#4594f0",
                  fontFamily: "MilkyNice",
                }}
              >
                Have an account?
              </Typography>
              <Typography
                fontSize={{ xs: "12px", sm: "20px" }}
                sx={{
                  fontWeight: "Bold",
                  color: "#4594f0",
                  fontFamily: "MilkyNice",
                }}
              >
                Log In
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                border: "2px solid #0d2346",
                borderRadius: "40px",
                mb: "20px",
              }}
            >
              <IconButton sx={{ p: "5px" }} aria-label="menu">
                <img
                  src={userName}
                  alt=""
                  style={{ maxWidth: "40px", filter: "hue-rotate(180deg)" }}
                />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1, color: "#4594f1" }}
                placeholder="Enter Your Email"
                onChange={handleChange("email")}
                autoComplete
                type="email"
                required
              />
            </Paper>
            <center>
              {emailerr ? <div style={errmsg}>{emailerr}</div> : null}
            </center>

            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                border: "2px solid #0d2346",
                borderRadius: "40px",
                mb: "20px",
              }}
            >
              <IconButton sx={{ p: "5px" }} aria-label="menu">
                <img
                  src={padlock}
                  alt=""
                  style={{ maxWidth: "40px", filter: "hue-rotate(180deg)" }}
                />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1, color: "#4594f1" }}
                placeholder="Enter your Password"
                type="password"
                onChange={handleChange("password")}
              />
            </Paper>
            <center>
              {passerr ? <div style={errmsg}>{passerr}</div> : null}
            </center>
          </Box>
          <Box mt={-1.8} mb={1} width="100%" textAlign="right">
            <Link
              to="/forgotpass"
              style={{ textDecoration: "none", color: "#4594f0" }}
            >
              <Box color="#4594f0" fontSize={{ md: "15px", xs: "13px" }}>
                Forgot password?
              </Box>
            </Link>
          </Box>
          {/* **********Recaptcha code************ */}
          {/* <Box>
            <ReCAPTCHA
              sitekey="6LeVHaAfAAAAAMtTBCfxxlHsJULQDAJP8OUJGQQl"
              onChange={onChange}
            />
          </Box> */}
          {/* **********END Recaptcha code************ */}
          <Box
            border="none"
            borderRadius="30px"
            my={3}
            sx={{ width: "fit-content" }}
          >
            <Button
              disabled={!isRecapVerfid}
              onClick={Submithandler}
              sx={{
                border: "1.5px solid white",
                borderRadius: "30px",
                backgroundImage: "#0d2346",
                fontSize: { xs: "17px", md: "24px" },
                fontWeight: "800",
                boxShadow: 4,
                textAlign: "center",
                py: "10px",
                px: "50px",
              }}
            >
              Log In
            </Button>
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "8px",
              background: "#12294e",
              borderRadius: "20px",
              mb: "5%",
            }}
          ></Box>
          <Typography
            fontSize={{ xs: "18px", sm: "30px" }}
            sx={{
              fontWeight: "Bold",
              color: "#4594f0",
              //   fontFamily: "MilkyNice",
              textAlign: "center",
            }}
          >
            New to Chat App?
          </Typography>

          <Link to="/signup" style={{ textDecoration: "none", color: "black" }}>
            <Button
              sx={{
                borderRadius: "30px",
                background: "#0d2346",
                fontSize: { xs: "14px", md: "24px" },
                "&:hover": {
                  background: "#0d2346a1",
                },
                color: "#4594f0",
                fontWeight: "800",
                boxShadow: 4,
                textAlign: "center",
                py: "10px",
                px: "20px",
                my: "5%",
              }}
            >
              Create Account
            </Button>
          </Link>
        </Box>
      </Container>
      <ToastContainer />
    </Box>
  );
};

export default Signup;
