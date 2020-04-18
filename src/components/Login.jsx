import React from "react";
import {
  TextField,
  InputAdornment,
  Button,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import AlternateEmail from "@material-ui/icons/AlternateEmail";
import LockOpen from "@material-ui/icons/LockOpen";
import VpnKey from "@material-ui/icons/VpnKey";
const Login = () => {
  return (
    <div className="container ">
      <div className="row full-height d-flex justify-content-center align-items-center">
        <div className="col-lg-4 col-md-6 col-sm-12 shadow-lg rounded p-5 border">
          <form
            onSubmit={(e) => {
              console.log("error");
            }}
          >
            <FormControl className="p-3">
              <TextField
                variant="outlined"
                required
                className="my-2 w-100"
                label="Email"
                InputProps={{
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
                className="w-100 my-2"
                label="Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <VpnKey />
                    </InputAdornment>
                  ),
                }}
                autoComplete="current-password"
              />
              <Button
                variant="contained"
                size="large"
                className="w-100 my-2"
                color="secondary"
                endIcon={<LockOpen />}
                type="submit"
              >
                Login
              </Button>
              <FormHelperText id="my-helper-text">
                We'll never share your email.
              </FormHelperText>
            </FormControl>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
