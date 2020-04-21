import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { isMobile } from "react-device-detect";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import MessageIcon from "@material-ui/icons/Message";
import BgPallete from "./BgPallete";
import {
  FormControl,
  TextField,
  InputAdornment,
  withStyles,
  Button,
} from "@material-ui/core";
import { addEntry } from "../store/slamEntries/actions/slamEntries.actions";
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
const AddEntryForm = ({ bg, classes }) => {
  const [custom_bg, setCustomBg] = useState(bg);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    const payload = {
      custom_bg,
      ...formData,
      isLoggedIn,
      enqueueSnackbar,
    };

    dispatch(addEntry(payload));
  };

  return (
    <form
      className={` rounded border border-dark ${isMobile ? "p-2" : "p-4"}`}
      id={custom_bg}
    >
      <BgPallete setBg={setCustomBg} />

      <FormControl className=" w-100 py-3">
        <TextField
          variant="outlined"
          required
          className={`w-100 my-2 ${classes.root}`}
          label="Name"
          onChange={(e) => handleChange(e)}
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
                <AssignmentIndIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          required
          className={`w-100 my-2 ${classes.root}`}
          label="Message"
          multiline
          rows={4}
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
                <MessageIcon />
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
          onClick={handleSubmit}
        >
          Add Request
        </Button>
      </FormControl>
    </form>
  );
};

export default withStyles(styles)(AddEntryForm);
