import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import Loader from "./../Loader/Loader.jsx";

import { VerifySignupToken } from "./../../redux/slices/globalSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./../qasim.css";

const Verifyemail = () => {
  const { search } = useLocation();
  const myEmailtoken = new URLSearchParams(search).get("token");
  console.log("myEmailtoken", myEmailtoken);
  let dispatch = useDispatch();

  const email = useSelector((store) => store.global.RegEmail);
  console.log("UserMailForVerify", email);

  useEffect(() => {
    let obj = {
      email: email,
      values: myEmailtoken,
    };

    dispatch(VerifySignupToken(obj));
  }, []);

  const VerifyRegTokenMailMsg = useSelector(
    (store) => store.global.VerifyRegTokenMailMsg
  );

  const prevVerifyTokenMsgRef = useRef(null);
  const [isVerifiedSuccess, setisVerifiedSuccess] = useState(false);

  React.useEffect(() => {
    if (VerifyRegTokenMailMsg == "Verification Failed") {
      //  dispatch(setSnackbar(true, "error", "Email Already Exist"));
      // console.log("toast");
      setisVerifiedSuccess(true);

      toast.error("Verification Failed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (
      VerifyRegTokenMailMsg ==
      "Verification Successful, Close this AND Go to Login Now"
    ) {
      toast.success("Verification Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [VerifyRegTokenMailMsg]);
  const [values, setValues] = useState({ token: "" });

  const [tokenerr, settokenerr] = useState("");

  const notify = () => toast("You have been Signup Successfully");

  // const tknmsg = useSelector((state) => state.Auth.TokenMsg);
  // console.log("tknmsg", tknmsg);

  // const ErrMsg = useSelector((state) => state.Auth.ErrMsg);
  // console.log("UserMailForVerify", ErrMsg);

  return (
    <div>
      <br />
      <h3
        style={{
          fontFamily: "cursive",
          textAlign: "center",
          color: "#a9256c",
          fontSize: "27px",
        }}
      >
        {" "}
        {/* <Loader /> */}
        {!isVerifiedSuccess ? (
          <>
            <h4>You Have Been Authorized To Enter Your Ctedentials</h4>
            <p>You can Close Magic Link and Go to Login Page Now</p>
          </>
        ) : (
          <div>Verification Failed Due to Edited Link..</div>
        )}
      </h3>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          &nbsp;
        </Grid>
        <Grid item xs={12} md={6} style={{ backgroundColor: "#fff7f9" }}>
          <center>
            {" "}
            <br />
          </center>
          <center>
            {/* {tokenerr ? <div className="errmsg">{tokenerr}</div> : null} */}
          </center>
          <br />

          <br />

          <center>
            {/* {tknmsg ? <div className="errmsg">{tknmsg}</div> : null} */}
          </center>
        </Grid>
        <Grid item xs={12} md={3}>
          &nbsp;
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default Verifyemail;
