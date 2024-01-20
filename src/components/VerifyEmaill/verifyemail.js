// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import IconButton from "@material-ui/core/IconButton";
// import Input from "@material-ui/core/Input";
// import FilledInput from "@material-ui/core/FilledInput";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
// import InputLabel from "@material-ui/core/InputLabel";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import FormControl from "@material-ui/core/FormControl";
// import TextField from "@material-ui/core/TextField";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";

// import Button from "@material-ui/core/Button";

// import { VerifyToken } from "./../../redux/actions/authuser";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./../qasim.css";

// const Verifyemail = () => {
//   const { search } = useLocation();
//   const myEmailtoken = new URLSearchParams(search).get("token");
//   console.log("myEmailtoken", myEmailtoken);
//   let dispatch = useDispatch();

//   const [values, setValues] = useState({ token: "" });

//   const [tokenerr, settokenerr] = useState("");
//   // const [passerr, setpasserr] = useState("");

//   const handleChange = (prop) => (event) => {
//     setValues({ ...values, [prop]: event.target.value });
//   };

//   const handleClickShowPassword = () => {
//     setValues({ ...values, showPassword: !values.showPassword });
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const validate = () => {
//     let isvalid = true;

//     console.log("values.token", values.token);

//     if (values.token == "") {
//       isvalid = false;
//       settokenerr("Token Should not  be Empty!");
//     } else {
//     }

//     return isvalid;
//   };

//   const notify = () => toast("You have been Signup Successfully");

//   // const email = useSelector((state) => state.Auth.Email);
//   const email = useSelector((store) => store.global.RegEmail);

//   console.log("UserMailForVerify", email);

//   // const tknmsg = useSelector((state) => state.Auth.TokenMsg);
//   // console.log("tknmsg", tknmsg);

//   // const ErrMsg = useSelector((state) => state.Auth.ErrMsg);
//   // console.log("UserMailForVerify", ErrMsg);

//   const submitHandler = (e) => {
//     e.preventDefault();

//     //  dispatch(signupdata(values));
//     var isFormvalid = validate();
//     console.log("isvalid", isFormvalid);

//     if (isFormvalid) {
//       let obj = {
//         email: email,
//         values: myEmailtoken,
//       };

//       // store.dispatch({ type: "HIDE_NOTIFICATION" });
//       dispatch(VerifyToken(obj));
//     }
//   };

//   return (
//     <div>
//       <br />
//       <h3
//         style={{
//           fontFamily: "cursive",
//           textAlign: "center",
//           color: "#a9256c",
//           fontSize: "27px",
//         }}
//       >
//         {" "}
//         Please Verify Your Email by Check email and Put Token Here!
//       </h3>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={3}>
//           &nbsp;
//         </Grid>
//         <Grid item xs={12} md={6} style={{ backgroundColor: "#fff7f9" }}>
//           <center>
//             {" "}
//             <FormControl
//               variant="outlined"
//               style={{ marginBottom: "10px", width: "70%" }}
//             >
//               <InputLabel htmlFor="outlined-adornment-password">
//                 JWT Token
//               </InputLabel>
//               <OutlinedInput
//                 id="outlined-adornment-password"
//                 type={values.showPassword ? "text" : "password"}
//                 value={values.password}
//                 onChange={handleChange("token")}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                       edge="end"
//                     >
//                       {values.showPassword ? <Visibility /> : <VisibilityOff />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//                 labelWidth={70}
//               />
//             </FormControl>
//             <br />
//           </center>
//           <center>
//             {tokenerr ? <div className="errmsg">{tokenerr}</div> : null}
//           </center>
//           <br />

//           <center>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={submitHandler}
//             >
//               Verify Me
//             </Button>
//           </center>
//           <br />

//           <center>
//             {tknmsg ? <div className="errmsg">{tknmsg}</div> : null}
//           </center>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           &nbsp;
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default Verifyemail;
