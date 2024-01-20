import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AccountCircle } from "@mui/icons-material";
import { Route, Navigate } from "react-router-dom";
import history from "../history/history.js";
import { useNavigate } from "react-router-dom";

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
import { forgotpass } from "./../../redux/slices/globalSlice.js";
import { clearForgotpassMsg } from "./../../redux/slices/globalSlice.js";

const ForgotPass = () => {
  const navigate = useNavigate();

  const [authloginMsg, setauthloginMsg] = useState("");

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ForgotMsg = useSelector((store) => store.global.ForgPassMsg);
  const prevForgotMsgRef = useRef(null);
  console.log("ForgotMsg", ForgotMsg);
  React.useEffect(() => {
    if (ForgotMsg !== prevForgotMsgRef.current) {
      if (ForgotMsg == "Cool Email Found, Redirecting to Change Password") {
        toast.success("Cool Email Found, Redirecting to Change Password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          setNewtest(false);

          navigate("/verifyTockenMail", { replace: true });
        }, 3000);
      } else if (ForgotMsg == "Email Not Found.") {
        toast.error("Email Not Found!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      prevForgotMsgRef.current = ForgotMsg;
    }
  }, [ForgotMsg]);

  const [newtest, setNewtest] = useState(false);

  let dispatch = useDispatch();

  const errmsg = {
    color: "red",
    position: "relative",
    top: "-11px",
  };

  const [values, setValues] = useState({
    email: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [emailerr, setemailerr] = useState("");

  const validate = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isemailVer = re.test(values.email);
    console.log("isemailVer", isemailVer);

    let isvalid = true;
    // const isvalid = {
    //   isvalidbool: true,

    // };

    if (!isemailVer) {
      isvalid = false;
      setemailerr("Your Email is not Correct!");
    } else {
      setemailerr("");
    }

    return isvalid;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    var isFormvalid = validate();
    console.log("isvalid", isFormvalid);

    if (isFormvalid) {
      dispatch(forgotpass(values));

      setTimeout(function () {
        dispatch(clearForgotpassMsg());
      }, 3000);
    }
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  return (
    <Box
      sx={{
        background: "white",
        mb: "30px",
      }}
    >
      {/* <BelowHead /> */}
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
            Forgott Password?
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
                Have an email?
              </Typography>
              <Typography
                fontSize={{ xs: "12px", sm: "20px" }}
                sx={{
                  fontWeight: "Bold",
                  color: "#4594f0",
                  fontFamily: "MilkyNice",
                }}
              >
                Recover Now
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
                type="email"
              />
            </Paper>
            <center>
              {emailerr ? <div style={errmsg}>{emailerr}</div> : null}
            </center>
          </Box>

          {/* **********Recaptcha code************ */}
          {/* <Box>
            <ReCAPTCHA
              sitekey="6Ldr2nYfAAAAAJEpd-DPS96WfKa0nFCzOnj5N2Zu"
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
              onClick={submitHandler}
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
              Recover
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

export default ForgotPass;
