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

import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VerifyTokenForPass } from "./../../redux/slices/globalSlice.js";
import { clearVerifyTokenMsg } from "./../../redux/slices/globalSlice.js";

const VerifyTockenMail = () => {
  const navigate = useNavigate();

  const email = useSelector((state) => state.global.ForgPassMsgMail);
  console.log("UserMailForVerify", email);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const TokenMsgPass = useSelector((state) => state.global.TokenMsgPassUpdate);

  const prevTokenMsgPassRef = useRef(null);
  React.useEffect(() => {
    if (TokenMsgPass !== prevTokenMsgPassRef.current) {
      // Dispatch the toast only if the message is different

      if (
        TokenMsgPass ==
        "You Have Been Verified for Password Update. Redirecting..."
      ) {
        toast.info(
          "You Have Been Verified for Password Update. Redirecting...",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        setTimeout(() => {
          navigate("/resetpass", { replace: true });
        }, 3000);
      } else if (TokenMsgPass == "Sorry Your Token Is Not Correct") {
        toast.error("Sorry Your Token Is Not Correct", {
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
      prevTokenMsgPassRef.current = TokenMsgPass;
    }
  }, [TokenMsgPass]);

  let dispatch = useDispatch();

  const errmsg = {
    color: "red",
    position: "relative",
    top: "-11px",
  };

  const [values, setValues] = useState({ token: "" });

  const [tokenerr, settokenerr] = useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const validate = () => {
    let isvalid = true;

    console.log("values.token", values.token);

    if (values.token == "") {
      isvalid = false;
      settokenerr("Token Should not  be Empty!");
    } else {
    }

    return isvalid;
  };

  // const TokenMsgPassUpdate = useSelector(
  //   (state) => state.Auth.TokenMsgPassUpdate
  // );
  // console.log("TokenMsgPassUpdate", TokenMsgPassUpdate);

  // if (
  //   TokenMsgPassUpdate ==
  //   "You Have Been Verified for Password Update. Redirecting..."
  // ) {
  //   setTimeout(() => {
  //     navigate("/resetpass", { replace: true });
  //   }, 3000);
  // }

  const submitHandler = (e) => {
    e.preventDefault();

    var isFormvalid = validate();
    console.log("isvalid", isFormvalid);

    if (isFormvalid) {
      let obj = {
        email: email,
        values: values,
      };
      dispatch(VerifyTokenForPass(obj));

      setTimeout(function () {
        dispatch(clearVerifyTokenMsg());
      }, 3000);
    }
  };

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
            Enter Code from gmail
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
                Have an email code?
              </Typography>
              <Typography
                fontSize={{ xs: "12px", sm: "20px" }}
                sx={{
                  fontWeight: "Bold",
                  color: "#4594f0",
                  fontFamily: "MilkyNice",
                }}
              >
                Verify Now
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
                  style={{ maxWidth: "40px", filter: "hue-rotate(180deg)" }}
                />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1, color: "#4594f1" }}
                placeholder="Enter Your Recovery Code"
                onChange={handleChange("token")}
              />
            </Paper>
            <center>
              {tokenerr ? <div style={errmsg}>{tokenerr}</div> : null}
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

export default VerifyTockenMail;
