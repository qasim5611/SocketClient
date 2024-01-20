import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AccountCircle } from "@mui/icons-material";
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
// import BelowHead from "../belowHead/belowHead";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ReCAPTCHA from "react-google-recaptcha";

import { useNavigate } from "react-router-dom";

import { resetpassw } from "./../../redux/slices/globalSlice.js";
import { BsCheckCircleFill } from "react-icons/bs";
// import { BsCheckCircleFill } from "react-icons/bi";

const ResetPass = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const resetPassMsgFinal = useSelector((state) => state.global.resetPassMsg);

  const prevresetPassMsgFinalRef = useRef(null);
  React.useEffect(() => {
    if (resetPassMsgFinal !== prevresetPassMsgFinalRef.current) {
      // Dispatch the toast only if the message is different

      if (resetPassMsgFinal == "Password Updated") {
        toast.info("Password Updated", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 3000);
      } else if (resetPassMsgFinal == "Password Not Updated") {
        toast.success("Password Not Updated", {
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
      prevresetPassMsgFinalRef.current = resetPassMsgFinal;
    }
  }, [resetPassMsgFinal]);

  // const [mailid, setMailid] = useState(false);

  const mailid = useSelector((state) => state.global.TokenEmailPassUpdate);
  console.log("RecoveryMail", mailid);

  let dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const errmsg = {
    color: "red",
    position: "relative",
    top: "-11px",
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  const [values, setValues] = useState({
    password: "",
    cpassword: "",
  });

  const [passerr, setpasserr] = useState("");

  const [clearpass, setclearpass] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const validate = () => {
    const pass = values.password;
    console.log("pass", pass);

    const conpass = values.cpassword;
    console.log("conpass", conpass);

    let isvalid = true;

    if (pass !== conpass || pass.length == 0 || conpass.length == 0) {
      isvalid = false;
      setpasserr("Password is not Match/Correct");
    } else {
      setpasserr("");
    }

    return isvalid;
  };

  // useEffect(() => {
  //   setMailid(RecoveryMail);
  // }, [RecoveryMail]);

  const resetNow = (e) => {
    console.log("reset called");
    e.preventDefault();

    var isFormvalid = validate();
    console.log("isvalid", isFormvalid);
    window.scrollTo(0, 200);
    if (isFormvalid) {
      let obj = {
        email: mailid,
        values,
      };
      dispatch(resetpassw(obj));
    }
  };

  // const SignUpResp = useSelector((state) => state.Auth.ErrMsg);
  // console.log("SignUp Responce is", SignUpResp);

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
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            fontSize={{ xs: "28px", sm: "48px" }}
            sx={{
              //   fontSize: "48px",
              fontWeight: "Bold",
              color: "#4594f1",
              borderBottom: "3px solid #4594f1",
              my: "5%",
              fontFamily: "MilkyNice",
            }}
          >
            Reset Your Password
          </Typography>
          {/* <Box
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
                New to Chat App?
              </Typography>
              <Typography
                fontSize={{ xs: "12px", sm: "20px" }}
                sx={{
                  fontWeight: "Bold",
                  color: "#4594f0",
                  fontFamily: "MilkyNice",
                }}
              >
                Create New Account
              </Typography>
            </Box>
          </Box> */}
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
                  src={padlock}
                  style={{ maxWidth: "40px", filter: "hue-rotate(180deg)" }}
                />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1, color: "#4594f1" }}
                placeholder="Enter New Password"
                type="password"
                onChange={handleChange("password")}
              />
            </Paper>
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
                <BsCheckCircleFill
                  style={
                    values.password === values.cpassword &&
                    values.password.length !== 0 &&
                    values.cpassword.length !== 0
                      ? {
                          color: "green",
                          maxWidth: "40px",
                          height: "40px",
                          width: "40px",
                        }
                      : { maxWidth: "40px", height: "40px", width: "40px" }
                  }
                />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1, color: "#4594f1" }}
                placeholder="Confirm Your New Password"
                type="password"
                onChange={handleChange("cpassword")}
              />
            </Paper>
            {passerr ? <div style={errmsg}>{passerr}</div> : null}
          </Box>
          {/* **********Recaptcha code************ */}
          {/* <Box>
            <ReCAPTCHA
              sitekey="6Ldr2nYfAAAAAJEpd-DPS96WfKa0nFCzOnj5N2Zu"
              onChange={onChange}
            />
          </Box> */}
          {/* **********END Recaptcha code************ */}
          {/* <Typography
            fontSize={{ xs: "14px", sm: "18px" }}
            sx={{
              fontWeight: "Bold",
              color: "#4594f1",
              //   fontFamily: "MilkyNice",
              textAlign: "center",
            }}
          >
            By clicking "Create Account" You agree to the terms and conditions{" "}
            <br /> of the foll0wing: Privacy & Terms
          </Typography> */}
          <Button
            // onClick={notify}
            onClick={resetNow}
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
            {" "}
            Reset Now
          </Button>
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
            Already have an account?
          </Typography>
          <Box
            border="none"
            borderRadius="30px"
            mt={3}
            sx={{ width: "fit-content" }}
          >
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button
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
                {" "}
                Log In
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ResetPass;
