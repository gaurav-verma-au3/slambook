import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { validateLoginForm } from "../utils";

import {
  TextField,
  InputAdornment,
  Button,
  FormControl,
  withStyles,
} from "@material-ui/core";
import AlternateEmail from "@material-ui/icons/AlternateEmail";
import LockOpen from "@material-ui/icons/LockOpen";
import VpnKey from "@material-ui/icons/VpnKey";
import { Link, Redirect } from "react-router-dom";
import Title from "./Title";
import ReactTyped from "react-typed";
import { login } from "../store/api/auth";
const styles = {
  root: {
    background: "transparent",
  },
  input: {
    color: "#161718",
  },
  cssLabel: {
    color: "#161718",
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `#161718`,
    },
    color: "#161718",
  },

  cssFocused: {
    color: "#161718",
  },

  notchedOutline: {
    borderWidth: "2px",
    borderColor: "#161718 !important",
  },
};

const Login = ({ classes }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const resetError = () => {
    setError({
      email: "",
      password: "",
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let valid = validateLoginForm(e, setError);
    if (valid) {
      login(
        e.target.email.value,
        e.target.password.value,
        dispatch,
        enqueueSnackbar
      );
    }
  };

  return (
    <div className="container-fluid">
      {isLoggedIn.success && <Redirect to="/app/home" />}
      <div className="row full-height d-flex justify-content-center align-items-center ">
        <div className="col-lg-3 col-md-6 col-sm-12  p-3 m-2">
          <Title />
          <form
            className="d-flex justify-content-center rounded py-3 "
            onSubmit={(e) => {
              handleLogin(e);
            }}
          >
            <FormControl className="py-3">
              <h2 className="text-center text-black login-heading">
                <ReactTyped strings={["Login..."]} typeSpeed={80} />
              </h2>
              <TextField
                variant="outlined"
                onChange={(e) => resetError()}
                error={error.email.length ? true : false}
                helperText={error.email}
                className={`w-100 my-2 ${classes.root}`}
                label="Email"
                name="email"
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <AlternateEmail />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                onChange={(e) => resetError()}
                error={error.password.length ? true : false}
                helperText={error.password}
                type="password"
                required
                name="password"
                variant="outlined"
                className={`w-100 my-2 ${classes.root}`}
                label="Password"
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <VpnKey />
                    </InputAdornment>
                  ),
                }}
                autoComplete="current-password"
              />
              <Button
                variant="outlined"
                size="large"
                color="secondary"
                style={{
                  border: "2px solid #161718",
                  color: "#f2f3f4",
                  background: "rgba(0, 0, 0, 0.6)",
                }}
                className="w-100 my-2"
                endIcon={<LockOpen />}
                type="submit"
              >
                Login
              </Button>
              <h6 className="text-center my-1 text-dark">
                Not Registered go to{" "}
                <Link className="text-dark text-underline" to="/signup">
                  SignUp
                </Link>
              </h6>
            </FormControl>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Login);
