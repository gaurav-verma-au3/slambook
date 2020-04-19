import React from "react";
import {
  TextField,
  InputAdornment,
  Button,
  FormControl,
  FormHelperText,
  withStyles,
} from "@material-ui/core";
import AlternateEmail from "@material-ui/icons/AlternateEmail";
import LockOpen from "@material-ui/icons/LockOpen";
import VpnKey from "@material-ui/icons/VpnKey";
import { Link } from "react-router-dom";
import Title from "./Title";
import ReactTyped from "react-typed";
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
const Login = (props) => {
  const { classes } = props;
  return (
    <div className="container-fluid">
      <div className="row full-height d-flex justify-content-center align-items-center ">
        <div className="col-lg-3 col-md-6 col-sm-12  p-3 m-2">
          <Title />
          <form
            className="d-flex justify-content-center rounded py-3 "
            onSubmit={(e) => {
              console.log("error");
            }}
          >
            <FormControl className="py-3">
              <h2 className="text-center text-black login-heading">
                <ReactTyped strings={["Login..."]} typeSpeed={80} />
              </h2>
              <TextField
                variant="outlined"
                required
                className={`w-100 my-2 ${classes.root}`}
                label="Email"
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
                // error={}
                // helperText={?"Required Field":''}
                type="password"
                required
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
              {/* <FormHelperText className="text-center" id="my-helper-text">
                We'll never share your email.
              </FormHelperText> */}
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
