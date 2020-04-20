import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import AlternateEmail from "@material-ui/icons/AlternateEmail";
import LockOpen from "@material-ui/icons/LockOpen";
import VpnKey from "@material-ui/icons/VpnKey";
import { Link, Redirect } from "react-router-dom";
import Title from "./Title";
import { withStyles } from "@material-ui/core/styles";
import ReactTyped from "react-typed";
import { API_ORIGIN_URL } from "../config";
import { useSnackbar } from "notistack";
import { handleNotification } from "../utils";
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

const Signup = (props) => {
  const { classes } = props;

  const [formData, setFormData] = useState({ bg: "background-9" });
  const [response, setResponse] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponse(null);
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `${API_ORIGIN_URL}/auth/signup`;
    fetch(url, {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setResponse(data);
        const { message, error } = data;
        const variant = error ? "error" : "success";
        console.log(message, variant);
        handleNotification(enqueueSnackbar, message, variant);
      });
  };

  return (
    <div>
      {response && !response.error ? <Redirect to="/login" /> : null}
      <div className="container-fluid">
        <div className="row full-height d-flex justify-content-center align-items-center ">
          <div className="col-lg-3 col-md-6 col-sm-12  p-3 m-2">
            <Title />
            <form
              className="d-flex justify-content-center rounded py-3 "
              onSubmit={(e) => handleSubmit(e)}
            >
              <FormControl className="py-3">
                <h2 className="text-center text-black login-heading">
                  <ReactTyped strings={["SignUp..."]} typeSpeed={80} />
                </h2>
                <TextField
                  variant="outlined"
                  required
                  label="Full Name"
                  name="name"
                  className={`my-2 w-100 ${classes.root}`}
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
                        <PermIdentityIcon className="text-dark" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  variant="outlined"
                  required
                  type="email"
                  className={`my-2 w-100 ${classes.root}`}
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
                        <AlternateEmail className="text-dark" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  // error={}
                  // helperText={?"Required Field":''}
                  type="password"
                  name="password"
                  required
                  variant="outlined"
                  className={`my-2 w-100 ${classes.root}`}
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
                        <VpnKey className="text-dark" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  // error={}
                  // helperText={?"Required Field":''}
                  type="password"
                  required
                  name="confirmPassword"
                  variant="outlined"
                  className={`my-2 w-100 ${classes.root}`}
                  label="Re Type Password"
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
                  }}
                  onChange={(e) => handleChange(e)}
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
                  Signup
                </Button>
                {response && response?.message ? (
                  <FormHelperText
                    className={`text-center ${
                      response.error ? "text-danger" : "text-success"
                    }`}
                    id="my-helper-text"
                  >
                    {response.message}
                  </FormHelperText>
                ) : null}
                <FormHelperText
                  className="text-center  text-dark"
                  id="my-helper-text"
                >
                  We'll never share your email.
                </FormHelperText>
                <h6 className="text-center my-1 text-black">
                  Already Registered go to{" "}
                  <Link className="text-dark text-underline" to="/login">
                    Login
                  </Link>
                </h6>
              </FormControl>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Signup);
