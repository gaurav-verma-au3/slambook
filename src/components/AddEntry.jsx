import React, { useState } from "react";
import BgPallete from "./BgPallete";
import { isMobile } from "react-device-detect";
import {
  FormControl,
  TextField,
  InputAdornment,
  withStyles,
  Button,
} from "@material-ui/core";
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
const AddEntry = ({ bg, classes }) => {
  const [customBg, setCustomBg] = useState(bg);
  return (
    <div className={`container-fluid ${isMobile ? "py-2" : "py-5"}`}>
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <form
            className={` rounded ${isMobile ? "p-3" : "p-5"}`}
            id={customBg}
          >
            <BgPallete setBg={setCustomBg} />

            <FormControl className=" w-100 py-3">
              <TextField
                variant="outlined"
                required
                className={`w-100 my-2 ${classes.root}`}
                label="Name"
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
                      {/* <AlternateEmail /> */}
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="outlined"
                style={{
                  border: "2px solid #161718",
                  color: "#f2f3f4",
                  background: "rgba(0, 0, 0, 0.6)",
                }}
                size="large"
                className="w-100 my-2 "
                // endIcon={<LockOpen />}
                type="submit"
              >
                Add Request
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(AddEntry);
